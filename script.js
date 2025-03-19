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
const feedbackData = [
    {
        name: "Sarah Thompson",
        location: "Richmond, VA",
        profilePic: "https://i.pravatar.cc/80?img=1",
        rating: 5,
        feedback: "Jon provided personalized attention throughout my case. He was always available to answer my questions directly, which made the process so much easier."
    },
    {
        name: "Michael Roberts",
        location: "Arlington, VA",
        profilePic: "https://i.pravatar.cc/80?img=2",
        rating: 5,
        feedback: "I appreciated how Jon handled every aspect of my case himself. It felt like I was his only client, even though I know he’s busy. Highly recommend!"
    },
    {
        name: "Emily Carter",
        location: "Norfolk, VA",
        profilePic: "https://i.pravatar.cc/80?img=3",
        rating: 4,
        feedback: "Jon’s direct involvement and consistent communication gave me complete confidence in his services. He made a stressful situation much more manageable."
    },
    {
        name: "David Wilson",
        location: "Charlottesville, VA",
        profilePic: "https://i.pravatar.cc/80?img=4",
        rating: 5,
        feedback: "What stood out to me was how responsive Jon was. I never had to go through assistants or wait days for a response. He’s truly dedicated to his clients."
    }
];

// Function to render feedback cards
function renderFeedback() {
    const feedbackGrid = document.querySelector('.feedback-grid');
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
        const template = group.firstElementChild.cloneNode(true); // Clone the first row

        // Reset values in the cloned row
        template.querySelectorAll('input, select, textarea').forEach(field => {
            if (field.type !== 'radio') field.value = ''; // Clear input values
            if (field.type === 'radio') field.checked = false; // Uncheck radios
        });

        // Remove Chosen's duplicate dropdown (if it exists)
        const chosenContainer = template.querySelector('.chosen-container');
        if (chosenContainer) {
            chosenContainer.remove(); // Remove the duplicate Chosen dropdown
        }

        // Remove the Chosen class from the select element
        const selectElement = template.querySelector('select.chosen-select');
        if (selectElement) {
            selectElement.classList.remove('chosen-select'); // Remove the Chosen class
            selectElement.style.display = 'block'; // Ensure the original select is visible
        }

        // Add the new row to the group
        group.appendChild(template);

        // Reinitialize Chosen for the new select element
        if (type === 'email' || type === 'phone' || type === 'address') {
            $(template).find('select').chosen({
                disable_search: true,
                width: '100%'
            });
        }

        // Reinitialize Cleave for phone fields
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
            // Validate form
            const validation = this.validateForm(form);
            if (!validation.isValid) {
                throw new Error(validation.errors.join('<br>'));
            }

            // Build payload
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

            // Submit to Clio via CORS proxy
            const response = await fetch(this.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.clio-inbox-leads-v1+json',
                    'Authorization': `Bearer ${this.API_KEY}`
                },
                body: JSON.stringify(payload)
            });

            // Handle non-JSON responses
            const responseText = await response.text();
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (error) {
                throw new Error(`Invalid response from server: ${responseText}`);
            }

            // Handle response
            if (!response.ok) {
                throw new Error(responseData.error || `HTTP error ${response.status}`);
            }

            // Show success message
            this.showSuccess();
            form.reset();
        } catch (error) {
            console.error('Submission error:', error);
            errorContainer.innerHTML = `
                <div class="error-message">
                    Submission failed: ${error.message}
                </div>
            `;
        }
    }

    validateForm(form) {
        const errors = [];
        
        // Required fields
        if (!form.from_first.value.trim()) errors.push('First name is required');
        if (!form.from_last.value.trim()) errors.push('Last name is required');
        if (!form.from_message.value.trim()) errors.push('Case description is required');
        
        // Primary selections
        if (!form.querySelector('[name="default_email"]:checked')) {
            errors.push('Please select a primary email');
        }
        if (!form.querySelector('[name="default_phone"]:checked')) {
            errors.push('Please select a primary phone number');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    getPrimaryValue(form, radioName, fieldName) {
        const primaryRow = form.querySelector(`[name="${radioName}"]:checked`).closest('.form-row');
        return primaryRow.querySelector(`[name="${fieldName}"]`).value;
    }

    showSuccess() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
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

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Remove no-js class
    document.body.classList.remove('no-js');

    // Initialize components
    new Chatbot();
    new FormManager();

    // Add this line to render feedback cards
    renderFeedback(); // 👈 This was missing
});