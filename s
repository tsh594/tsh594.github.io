class Chatbot {
    constructor() {
        this.chatbotToggle = document.querySelector('.chatbot-toggle');
        this.chatbotContainer = document.querySelector('.chatbot-container');
        this.init();
    }

    init() {
        this.chatbotToggle.addEventListener('click', () => {
            this.chatbotContainer.classList.toggle('active');
        });
    }
}

// Client Feedback Data
// Client Feedback Data
const feedbackData = [
    {
        name: "Sarah Thompson",
        location: "Richmond, VA",
        profilePic: "./assets/Sarah Thompson.jpg", // Add file extension
        rating: 5,
        feedback: "Jon provided personalized attention throughout my case. He was always available to answer my questions directly, which made the process so much easier."
    },
    {
        name: "Michael Roberts",
        location: "Arlington, VA",
        profilePic: "./assets/Michael Roberts.jpg", // Add file extension
        rating: 5,
        feedback: "I appreciated how Jon handled every aspect of my case himself. It felt like I was his only client, even though I know he’s busy. Highly recommend!"
    },
    {
        name: "Emily Carter",
        location: "Norfolk, VA",
        profilePic: "./assets/Emily Carter.jpg", // Add file extension
        rating: 4,
        feedback: "Jon’s direct involvement and consistent communication gave me complete confidence in his services. He made a stressful situation much more manageable."
    },
    {
        name: "David Wilson",
        location: "Charlottesville, VA",
        profilePic: "./assets/David Wilson.jpg", // Add file extension
        rating: 5,
        feedback: "What stood out to me was how responsive Jon was. I never had to go through assistants or wait days for a response. He’s truly dedicated to his clients."
    }
];

// Function to render feedback cards
function renderFeedback() {
    console.log('Rendering feedback...'); // Debugging line
    const feedbackGrid = document.querySelector('.feedback-grid');
    if (!feedbackGrid) {
        console.error('Feedback grid not found!'); // Debugging line
        return;
    }
    feedbackGrid.innerHTML = feedbackData.map(client => `
        <div class="feedback-card">
            <div class="client-profile">
                <img src="${client.profilePic}" alt="${client.name}" class="client-avatar">
                <div class="client-info">
                    <h4>${client.name}</h4>
                    <p class="client-location">${client.location}</p>
                </div>
            </div>
            <div class="rating">
                ${'<i class="fas fa-star"></i>'.repeat(client.rating)}
                ${client.rating < 5 ? '<i class="far fa-star"></i>'.repeat(5 - client.rating) : ''}
            </div>
            <p class="feedback-text">"${client.feedback}"</p>
        </div>
    `).join('');
}



class FormManager {
    constructor() {
        this.API_ENDPOINT = 'https://hayslawva-test.me/submit-form.php';        
        this.API_KEY = '82d68da5d013ef36e1a8e76ec35d6fb6'; // Replace with your actual API key
        this.init();
    }

    init() {
        this.setupDynamicFields();
        this.setupValidation();
        this.initializePlugins();
        this.setupModal();
    }

    initializePlugins() {
        // Initialize Chosen selects
        $('select.chosen-select').chosen({
            disable_search: true,
            width: '100%'
        });

        // Initialize phone formatting
        new Cleave('.phone-input', {
            phone: true,
            phoneRegionCode: 'US',
            delimiter: '-',
            prefix: '+1',
            numericOnly: true
        });
    }

    setupDynamicFields() {
        // Email fields
        document.querySelector('.add-email').addEventListener('click', (e) => {
            e.preventDefault();
            this.cloneFieldGroup('.email-group', 'email');
        });

        // Phone fields
        document.querySelector('.add-phone').addEventListener('click', (e) => {
            e.preventDefault();
            this.cloneFieldGroup('.phone-group', 'phone');
        });

        // Address fields
        document.querySelector('.add-address').addEventListener('click', (e) => {
            e.preventDefault();
            this.cloneFieldGroup('.address-group', 'address');
        });
    }

    cloneFieldGroup(selector, type) {
        const group = document.querySelector(selector);
        const template = group.firstElementChild.cloneNode(true);

        // Reset values
        template.querySelectorAll('input, select, textarea').forEach(field => {
            if (field.type !== 'radio') field.value = '';
            if (field.type === 'radio') field.checked = false;
        });

        // Reinitialize components
        const chosenContainer = template.querySelector('.chosen-container');
        if (chosenContainer) chosenContainer.remove();

        const selectElement = template.querySelector('select');
        if (selectElement) {
            selectElement.classList.remove('chosen-select');
            selectElement.style.display = 'block';
        }

        group.appendChild(template);

        if (selectElement) {
            $(selectElement).chosen({
                disable_search: true,
                width: '100%'
            });
        }

        if (type === 'phone') {
            new Cleave(template.querySelector('.phone-input'), {
                phone: true,
                phoneRegionCode: 'US',
                delimiter: '-',
                prefix: '+1',
                numericOnly: true
            });
        }
    }

    setupValidation() {
        document.getElementById('leadForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit(e);
        });
    }

    async handleFormSubmit(e) {
        const form = e.target;
        const errorContainer = form.querySelector('.error-messages');
        errorContainer.innerHTML = '';

        try {
            const validation = this.validateForm(form);
            if (!validation.isValid) {
                throw new Error(validation.errors.join('<br>'));
            }

            const payload = {
                inbox_lead: {
                    from_first: form.from_first.value,
                    from_last: form.from_last.value,
                    from_email: this.getPrimaryValue(form, 'default_email', 'from_email'),
                    from_phone: this.getPrimaryValue(form, 'default_phone', 'from_phone'),
                    from_message: form.from_message.value,
                    custom_fields: {
                        urgency_level: form.urgency_level.value,
                        area_of_law: form.area_of_law.value,
                        referral_source: form.referral_source.value
                    }
                },
                inbox_lead_token: form.inbox_lead_token.value,
                referring_url: form.referring_url.value,
                from_source: form.from_source.value
            };

            const response = await fetch(this.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.clio-inbox-leads-v1+json',
                    'Authorization': `Bearer ${this.API_KEY}`
                },
                body: JSON.stringify(payload)
            });

            const responseText = await response.text();
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (error) {
                throw new Error(`Invalid response: ${responseText}`);
            }

            if (!response.ok) {
                throw new Error(responseData.error || `HTTP error ${response.status}`);
            }

            this.showSuccess();
            form.reset();
        } catch (error) {
            errorContainer.innerHTML = `
                <div class="error-message">
                    Error: ${error.message}
                </div>
            `;
        }
    }

    validateForm(form) {
        const errors = [];
        if (!form.from_first.value.trim()) errors.push('First name required');
        if (!form.from_last.value.trim()) errors.push('Last name required');
        if (!form.from_message.value.trim()) errors.push('Case description required');
        return { isValid: errors.length === 0, errors };
    }

    getPrimaryValue(form, radioName, fieldName) {
        const primaryRow = form.querySelector(`[name="${radioName}"]:checked`).closest('.form-row');
        return primaryRow.querySelector(`[name="${fieldName}"]`).value;
    }

    showSuccess() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.style.display = 'none', 3000);
    }

    setupModal() {
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('successModal').style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('successModal')) {
                document.getElementById('successModal').style.display = 'none';
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Debugging line
    document.body.classList.remove('no-js');
    new Chatbot();
    new FormManager();
    renderFeedback();
});