// Mobile menu functionality with null checks
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('active');
            
            // Close any open dropdowns when menu opens
            if (!navbar.classList.contains('active')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    if (dropdown) dropdown.classList.remove('active');
                });
            }
        }
    });
}

// Dropdown functionality with safe element checking
const dropdownLinks = document.querySelectorAll('.dropdown > a');
if (dropdownLinks.length > 0) {
    dropdownLinks.forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function(e) {
            const dropdown = this.parentElement;
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile && dropdown) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                e.stopPropagation();
            }
        });
    });
}

// Close menu and dropdowns when clicking outside
document.addEventListener('click', function(e) {
    const navbar = document.querySelector('.navbar');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Close navbar if clicking outside
    if (navbar && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
    }
    
    // Close dropdowns if clicking outside
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            if (dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});

// Close dropdowns when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown) dropdown.classList.remove('active');
        });
    }
});

// Smooth scroll for navigation links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
if (anchorLinks.length > 0) {
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// FAQ functionality
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqCard = button.parentElement;
            if (faqCard) {
                const answer = faqCard.querySelector('.faq-answer');
                const icon = button.querySelector('i');
                if (answer) answer.classList.toggle('active');
                if (icon) {
                    icon.classList.toggle('fa-chevron-up');
                    icon.classList.toggle('fa-chevron-down');
                }
            }
        });
    });
}

// Enhanced Chatbot Class with null checks
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
        
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleChatbot();
            });
        }

        document.addEventListener('click', (e) => {
            if (this.container && 
                !this.container.contains(e.target) && 
                !e.target.classList.contains('chatbot-toggle')) {
                this.closeChatbot();
            }
        });

        if (this.container) {
            this.container.addEventListener('click', (e) => {
                const questionBtn = e.target.closest('.question-btn');
                if (questionBtn) {
                    e.stopPropagation();
                    const index = parseInt(questionBtn.dataset.index);
                    this.handleQuestionClick(index);
                }
            });
        }
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        if (this.container) {
            this.container.classList.toggle('active');
            if (this.isOpen) this.renderChatbot();
        }
    }

    closeChatbot() {
        this.isOpen = false;
        if (this.container) this.container.classList.remove('active');
    }

    handleQuestionClick(index) {
        this.selectedQuestion = this.selectedQuestion === index ? null : index;
        this.renderChatbot();
    }

    renderChatbot() {
        if (!this.container) return;
        
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

// Client Feedback Data and Rendering
const feedbackData = [
    {
        name: "Alejandro",
        location: "Richmond, VA Example City",
        profilePic: "./assets/Alejandro.jpg",
        rating: 5,
        feedback: "Jon F. Hays has been very help full and very knowledgeable always honest, He took care of our problem and we are very pleased with the results. I can personally recommend Jon for any of your legal problems, in our case we needed to collect money owed for almost a year and in less then a month we started receiving payments."
    },
    {
        name: "Jim",
        location: "Arlington, VA Example City",
        profilePic: "./assets/Jim.jpg",
        rating: 5,
        feedback: "This attorney knew how to take the necessary steps to close out a problem that had plagued us for a long time. He did it swiftly and did not drag his feet running up the bill. We found him honest, knowledgeable, and dependable. also more than reasonably priced."
    }
];

function renderFeedback() {
    const feedbackGrid = document.querySelector('.feedback-grid');
    if (feedbackGrid) {
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
}

// Form Submission Handler
function setupFormListener() {
    const formContainer = document.querySelector('.form-container');
    const iframe = document.querySelector('.clio-form-iframe');
    
    if (iframe) {
        iframe.onload = () => {
            formContainer?.classList.remove('loading');
        };
        formContainer?.classList.add('loading');
    }

    const modal = document.getElementById('successModal');
    if (modal) {
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        window.addEventListener('message', (event) => {
            if (event.origin === 'https://hayslawva.cliogrow.com' && event.data === 'formSubmitted') {
                modal.style.display = 'flex';
                document.querySelectorAll('iframe').forEach(iframe => {
                    if (iframe) iframe.src = iframe.src;
                });
            }
        });
    }
}

// Logo visibility control
const logoHeader = document.querySelector('.logo-header');
if (logoHeader) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            
            // Show logo only when in the hero section
            if (currentScroll < heroHeight * 0.1) {
                logoHeader.classList.remove('hidden');
            } else {
                logoHeader.classList.add('hidden');
            }
            
            lastScroll = currentScroll;
        }
    });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Chatbot
    new Chatbot();
    
    // Initialize feedback if on homepage
    if (document.querySelector('.feedback-grid')) {
        renderFeedback();
    }
    
    // Initialize form listener if on contact page
    if (document.querySelector('.form-container')) {
        setupFormListener();
    }

    // Safely handle CSRF token if exists
    const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    const csrfInput = document.querySelector('input[name="authenticity_token"]');
    
    if (csrfMetaTag && csrfInput) {
        csrfInput.value = csrfMetaTag.content;
    }

    // Form validation for intake form
    const intakeForm = document.getElementById('new_intake_form');
    if (intakeForm) {
        intakeForm.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill out all required fields.');
                return;
            }
            
            // Show loading state
            this.classList.add('submitting');
        });
    }

    // Improved iframe loading handler
    const formIframe = document.querySelector('.clio-form-iframe');
    if (formIframe) {
        formIframe.onload = function() {
            formIframe.classList.add('loaded');
        };
        
        setTimeout(function() {
            if (!formIframe.classList.contains('loaded')) {
                formIframe.classList.add('loaded');
            }
        }, 5000);
    }
});



// Blog Admin Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in (this would be replaced with actual auth check)
    const isAdmin = false; // Change to true when Jon is logged in
    
    // Show admin panel if logged in
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel && isAdmin) {
        adminPanel.style.display = 'block';
    }
    
    // Blog Editor Toggle
    const newPostBtn = document.getElementById('newPostBtn');
    const editPostBtn = document.getElementById('editPostBtn');
    const blogEditor = document.getElementById('blogEditor');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    
    if (newPostBtn && blogEditor) {
        newPostBtn.addEventListener('click', function() {
            // Clear form for new post
            document.getElementById('postTitle').value = '';
            document.getElementById('postDate').valueAsDate = new Date();
            document.getElementById('postCategory').value = 'estate-planning';
            document.getElementById('postImage').value = '';
            document.getElementById('postContent').value = '';
            
            // Show editor
            blogEditor.style.display = 'block';
            window.scrollTo({ top: blogEditor.offsetTop - 20, behavior: 'smooth' });
        });
    }
    
    if (editPostBtn && blogEditor) {
        editPostBtn.addEventListener('click', function() {
            // In a real implementation, this would populate with selected post data
            alert('Select a post to edit from the blog list');
        });
    }
    
    if (cancelEditBtn && blogEditor) {
        cancelEditBtn.addEventListener('click', function() {
            blogEditor.style.display = 'none';
        });
    }
    
    // Publish/Save Post
    const publishPostBtn = document.getElementById('publishPostBtn');
    if (publishPostBtn) {
        publishPostBtn.addEventListener('click', function() {
            // Get form values
            const title = document.getElementById('postTitle').value;
            const date = document.getElementById('postDate').value;
            const category = document.getElementById('postCategory').value;
            const image = document.getElementById('postImage').value;
            const content = document.getElementById('postContent').value;
            
            // Validate
            if (!title || !content) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, this would save to a database
            alert('Blog post saved! (This would connect to a CMS in production)');
            blogEditor.style.display = 'none';
        });
    }
    
    // Category Filtering
    const categoryLinks = document.querySelectorAll('.category-list a');
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Update active state
                categoryLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Filter posts
                const posts = document.querySelectorAll('.blog-post');
                posts.forEach(post => {
                    if (category === 'all' || post.getAttribute('data-category') === category) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }
});


// In script.js
document.querySelector('.hero-video').addEventListener('error', (e) => {
    console.error('Video load error:', e.target.error);
    document.querySelector('.hero-image-overlay').style.display = 'block';
});


// Testimonial Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;

            testimonialCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});