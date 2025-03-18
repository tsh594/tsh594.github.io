class Chatbot {
    // Keep existing Chatbot implementation
    // ...
}

class FormManager {
    constructor() {
        this.API_ENDPOINT = 'https://cors-anywhere.herokuapp.com/https://app.clio.com/inbox_leads.json';
        this.API_KEY = 'YOUR_CLIO_API_KEY'; // REPLACE THIS
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

            // Handle response
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error ${response.status}`);
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
});