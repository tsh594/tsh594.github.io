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
            e.stopPropagation();
            this.toggleChatbot();
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target) && 
                !e.target.classList.contains('chatbot-toggle')) {
                this.closeChatbot();
            }
        });

        this.container.addEventListener('click', (e) => {
            const questionBtn = e.target.closest('.question-btn');
            if (questionBtn) {
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

// Form Submission Handler
function setupFormListener() {
    // Add loading state handling
    const formContainer = document.querySelector('.form-container');
    const iframe = document.getElementById('caseInquiryFrame');

    iframe.onload = () => {
        formContainer.classList.remove('loading');
    };
    
    // Show loading state initially
    formContainer.classList.add('loading');
    
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Listen for form submissions from iframes
    window.addEventListener('message', (event) => {
        if (event.origin === 'https://hayslawva.cliogrow.com') {
            if (event.data === 'formSubmitted') {
                modal.style.display = 'flex';
                // Refresh iframe sources
                document.querySelectorAll('iframe').forEach(iframe => {
                    iframe.src = iframe.src;
                });
            }
        }
    });

    // Close modal handlers
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize chatbot when window loads
// Initialize when DOM is ready
// Initialize when DOM loads
// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
    renderFeedback();
    setupFormListener();
});