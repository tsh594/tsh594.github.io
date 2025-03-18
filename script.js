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
        
        this.toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleChatbot();
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.closeChatbot();
            }
        });

        this.container.addEventListener('click', (e) => {
            const questionBtn = e.target.closest('.question-btn');
            if (questionBtn) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(questionBtn.dataset.index);
                this.handleQuestionClick(index);
            }
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        this.container.classList.toggle('active');
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

// Client Feedback Data and Render Function
const feedbackData = [/* Your feedback data here */];

function renderFeedback() {
    // Your existing renderFeedback implementation
}

// Dynamic Field Management
function initializeChosen(element) {
    $(element).find('select.chosen-select').chosen({
        disable_search: true,
        width: '100%'
    });
}

function initializeCleave(element) {
    new Cleave(element.querySelector('.phone-input'), {
        phone: true,
        phoneRegionCode: 'US',
        delimiter: '-',
        prefix: '+1',
        numericOnly: true
    });
}

function setupDynamicFields() {
    // Remove existing listeners to prevent duplicates
    const buttons = document.querySelectorAll('.add-email, .add-phone, .add-address');
    buttons.forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });

    // Email Fields
    document.querySelector('.add-email').addEventListener('click', function(e) {
        e.preventDefault();
        const emailGroup = document.querySelector('.email-group');
        const newRow = emailGroup.children[0].cloneNode(true);
        
        newRow.querySelectorAll('input').forEach(input => {
            if (input.type !== 'radio') input.value = '';
            else input.checked = false;
        });
        
        emailGroup.appendChild(newRow);
        initializeChosen(newRow);
    });

    // Phone Fields
    document.querySelector('.add-phone').addEventListener('click', function(e) {
        e.preventDefault();
        const phoneGroup = document.querySelector('.phone-group');
        const newRow = phoneGroup.children[0].cloneNode(true);
        
        newRow.querySelectorAll('input').forEach(input => {
            if (input.type !== 'radio') input.value = '';
            else input.checked = false;
        });
        
        phoneGroup.appendChild(newRow);
        initializeChosen(newRow);
        initializeCleave(newRow);
    });

    // Address Fields (Improved cloning)
    document.querySelector('.add-address').addEventListener('click', function(e) {
        e.preventDefault();
        const addressContainer = document.querySelector('.address-group').parentNode;
        const template = document.querySelector('.address-group').cloneNode(true);
        
        template.querySelectorAll('input, textarea, select').forEach(field => {
            if (field.type !== 'radio') field.value = '';
            else field.checked = false;
        });
        
        addressContainer.insertBefore(template, this);
        initializeChosen(template);
    });

    // Radio Button Handling
    document.querySelectorAll('.form-container').forEach(container => {
        container.addEventListener('change', function(e) {
            if (e.target.name === 'default_email' || e.target.name === 'default_phone') {
                const groupName = e.target.name;
                const rows = this.querySelectorAll(`[name="${groupName}"]`);
                rows.forEach(radio => {
                    radio.closest('.form-row').classList.remove('primary-selected');
                });
                e.target.closest('.form-row').classList.add('primary-selected');
            }
        });
    });
}

// Form Submission Handler with Validation
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Validate primary selections
    const primaryEmail = document.querySelector('[name="default_email"]:checked');
    const primaryPhone = document.querySelector('[name="default_phone"]:checked');

    if (!primaryEmail || !primaryPhone) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Please select a primary email and phone number';
        document.querySelector('.form-actions').prepend(errorMessage);
        return;
    }

    // Collect form data
    const formData = {
        inbox_lead_token: document.getElementById('inbox_lead_token').value,
        inbox_lead: {
            from_first: document.querySelector('[name="from_first"]').value,
            from_last: document.querySelector('[name="from_last"]').value,
            from_email: primaryEmail.closest('.form-row').querySelector('[name="from_email"]').value,
            from_phone: primaryPhone.closest('.form-row').querySelector('[name="from_phone"]').value,
            from_message: `${document.querySelector('[name="from_message"]').value}\n
                           Urgency: ${document.querySelector('[name="urgency_level"]').value}\n
                           Case Type: ${document.querySelector('[name="area_of_law"]').value}`,
            referring_url: document.getElementById('referring_url').value,
            from_source: document.getElementById('from_source').value
        }
    };

    try {
        const response = await fetch('https://grow.clio.com/inbox_leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        document.getElementById('successModal').style.display = 'flex';
        document.getElementById('leadForm').reset();
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = `Submission failed: ${error.message}`;
        document.querySelector('.form-actions').prepend(errorMessage);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new Chatbot();
    renderFeedback();
    setupDynamicFields();
    
    // Initialize form elements
    initializeChosen(document);
    initializeCleave(document.querySelector('.phone-input'));
    
    // Form submission
    document.getElementById('leadForm').addEventListener('submit', handleFormSubmit);
    
    // Modal handling
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('successModal').style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('successModal')) {
            document.getElementById('successModal').style.display = 'none';
        }
    });
});