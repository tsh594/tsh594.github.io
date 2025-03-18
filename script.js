// Chatbot class with CSP-safe event handlers
class Chatbot {
    constructor() {
        this.faqs = [
            { 
                question: "What are your office hours?", 
                answer: "Monday-Friday: 9AM - 5PM EST<br>Saturday: By appointment only" 
            },
            { 
                question: "Do you offer free consultations?", 
                answer: "We provide a 30-minute complimentary initial consultation" 
            },
            { 
                question: "What payment methods do you accept?", 
                answer: "We accept credit cards, checks, and wire transfers" 
            },
        ];
        this.selectedQuestion = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.container = document.querySelector('.chatbot-container');
        this.toggleBtn = document.querySelector('.chatbot-toggle');
        
        // Use passive event listener for better performance
        this.toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleChatbot();
        }, { passive: false });

        // Delegate document click handler
        document.body.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target)) {
                this.closeChatbot();
            }
        }, { passive: true });

        // Delegate question clicks
        this.container.addEventListener('click', (e) => {
            const questionBtn = e.target.closest('.question-btn');
            if (questionBtn) {
                e.preventDefault();
                e.stopPropagation();
                this.handleQuestionClick(parseInt(questionBtn.dataset.index));
            }
        }, { passive: false });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        this.container.classList.toggle('active', this.isOpen);
        if (this.isOpen) this.renderChatbot();
    }

    closeChatbot() {
        this.isOpen = false;
        this.container.classList.remove('active');
    }

    handleQuestionClick(index) {
        this.selectedQuestion = this.selectedQuestion === index ? null : index;
        this.renderChatbot();
    }

    renderChatbot() {
        this.container.innerHTML = `
            <div class="chatbot-header">
                <i class="fas fa-comments"></i>
                <h4>Client Assistance</h4>
            </div>
            <div class="questions-list">
                ${this.faqs.map((faq, i) => `
                    <button 
                        type="button"
                        class="question-btn ${this.selectedQuestion === i ? 'active' : ''}" 
                        data-index="${i}"
                    >
                        ${faq.question}
                    </button>
                `).join('')}
            </div>
            ${this.selectedQuestion !== null ? `
                <div class="answer-box">
                    ${this.faqs[this.selectedQuestion].answer}
                </div>
            ` : ''}
        `;
    }
}

// Dynamic Field Manager with server-safe cloning
class FormManager {
    constructor() {
        this.initializeChosen = this.initializeChosen.bind(this);
        this.initializeCleave = this.initializeCleave.bind(this);
        this.init();
    }

    init() {
        this.setupDynamicFields();
        this.setupValidation();
        this.initializeChosen(document);
        this.initializeCleave(document.querySelector('.phone-input'));
    }

    initializeChosen(container) {
        $(container).find('select.chosen-select').chosen({
            disable_search: true,
            width: '100%',
            allow_single_deselect: true
        });
    }

    initializeCleave(input) {
        if (input) {
            new Cleave(input, {
                phone: true,
                phoneRegionCode: 'US',
                delimiter: '-',
                prefix: '+1',
                numericOnly: true
            });
        }
    }

    setupDynamicFields() {
        // Event delegation for dynamic buttons
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('.add-email')) this.handleAddEmail(e);
            if (e.target.matches('.add-phone')) this.handleAddPhone(e);
            if (e.target.matches('.add-address')) this.handleAddAddress(e);
        });

        // Radio button state management
        document.body.addEventListener('change', (e) => {
            if (e.target.name === 'default_email' || e.target.name === 'default_phone') {
                this.updatePrimaryState(e.target);
            }
        });
    }

    handleAddEmail(e) {
        e.preventDefault();
        const emailGroup = document.querySelector('.email-group');
        const template = emailGroup.firstElementChild.cloneNode(true);
        
        template.querySelectorAll('input').forEach(input => {
            if (input.type === 'email') input.value = '';
            if (input.type === 'radio') input.checked = false;
        });
        
        emailGroup.appendChild(template);
        this.initializeChosen(template);
    }

    handleAddPhone(e) {
        e.preventDefault();
        const phoneGroup = document.querySelector('.phone-group');
        const template = phoneGroup.firstElementChild.cloneNode(true);
        
        template.querySelectorAll('input').forEach(input => {
            if (input.type === 'tel') input.value = '';
            if (input.type === 'radio') input.checked = false;
        });
        
        phoneGroup.appendChild(template);
        this.initializeChosen(template);
        this.initializeCleave(template.querySelector('.phone-input'));
    }

    handleAddAddress(e) {
        e.preventDefault();
        const addressContainer = document.querySelector('.address-group').parentNode;
        const template = document.querySelector('.address-group').cloneNode(true);
        
        template.querySelectorAll('input, textarea, select').forEach(field => {
            if (field.type !== 'radio') field.value = '';
            else field.checked = false;
        });
        
        addressContainer.insertBefore(template, e.target);
        this.initializeChosen(template);
    }

    updatePrimaryState(radio) {
        const groupName = radio.name;
        const container = radio.closest('.form-container');
        
        container.querySelectorAll(`[name="${groupName}"]`).forEach(r => {
            r.closest('.form-row').classList.remove('primary-selected');
        });
        
        radio.closest('.form-row').classList.add('primary-selected');
    }

    setupValidation() {
        document.getElementById('leadForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            this.handleFormSubmit(e);
        });
    }

    async handleFormSubmit(e) {
        const form = e.target;
        const errorContainer = form.querySelector('.error-messages');
        errorContainer.innerHTML = '';
        
        // Validate required fields
        const errors = [];
        if (!form.querySelector('[name="default_email"]:checked')) {
            errors.push('Please select a primary email');
        }
        if (!form.querySelector('[name="default_phone"]:checked')) {
            errors.push('Please select a primary phone number');
        }

        if (errors.length > 0) {
            errorContainer.innerHTML = errors.map(msg => `
                <div class="error-message">${msg}</div>
            `).join('');
            return;
        }

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action || 'https://grow.clio.com/inbox_leads', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            document.getElementById('successModal').style.display = 'flex';
            form.reset();
        } catch (error) {
            errorContainer.innerHTML = `
                <div class="error-message">Submission failed: ${error.message}</div>
            `;
        }
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Remove no-js class
    document.body.classList.remove('no-js');

    // Initialize components
    new Chatbot();
    new FormManager();

    // Modal handling
    const modal = document.getElementById('successModal');
    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Debugging checks
    console.log('Dependencies loaded:', {
        jQuery: !!window.jQuery,
        Chosen: !!window.jQuery.fn.chosen,
        Cleave: !!window.Cleave
    });
});