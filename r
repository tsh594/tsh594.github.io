:root {
  --navy: #2C3E50;
  --gold: #D4AF37;
  --gray: #6C7A89;
  --white: #FFFFFF;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Lato', sans-serif;
  line-height: 1.6;
}

/* Logo Header */
.logo-header {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  animation: fadeInDown 1s ease-out;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 25px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: contain;
  border: 2px solid var(--gold);
  animation: float 3s ease-in-out infinite;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.2;
}

.logo-tagline {
  font-size: 1rem;
  color: var(--gray);
  font-weight: 500;
}

/* Floating Animation */
@keyframes float {
  0%, 100% {
      transform: translateY(0);
  }
  50% {
      transform: translateY(-10px);
  }
}

/* Responsive Design for Logo */
@media (max-width: 768px) {
  .logo-header {
      top: 10px;
      left: 10px;
  }

  .logo-container {
      padding: 10px 20px;
  }

  .logo {
      width: 80px;
      height: 80px;
  }

  .logo-name {
      font-size: 1.4rem;
  }

  .logo-tagline {
      font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .logo {
      width: 60px;
      height: 60px;
  }

  .logo-name {
      font-size: 1.2rem;
  }

  .logo-tagline {
      font-size: 0.8rem;
  }
}

/* Hero Section */
.hero {
  background-color: rgba(100, 120, 140, 0.4);
  height: 70vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--white);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  margin-top: 140px;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('./assets/scale.jpg') center/contain no-repeat;
  z-index: -1;
}

.hero-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: 3.8rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  animation: fadeInDown 1s ease-out;
}

.tagline {
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 1.2px;
  color: rgba(255, 255, 255, 0.95);
  display: inline-block;
  padding: 0.8rem 1.8rem;
  background: rgba(68, 90, 112, 0.65);
  border-radius: 25px;
  backdrop-filter: blur(6px);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  animation: fadeInUp 1s ease-out 0.5s;
  animation-fill-mode: both;
  transition: all 0.3s ease;
}

.tagline:hover {
  background: rgba(68, 90, 112, 0.8);
  transform: translateY(-2px);
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Services Section */
.services {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.services h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--navy);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: var(--white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* Contact Section */
.clio-iframe {
  width: 100%;
  height: 500px;
  border: none;
  border-radius: 8px;
  background: white;
}

/* Contact Section Alignment */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-item i {
  font-size: 1.2rem;
  color: var(--gold);
  min-width: 30px;
  text-align: center;
}

.address p {
  margin: 0;
  line-height: 1.4;
}

/* Existing contact styles remain */
.contact {
  padding: 4rem 2rem;
  background: var(--navy);
  color: var(--white);
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
}

/* Chatbot */
.floating-chatbot {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.chatbot-toggle {
  background: var(--gold);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.chatbot-toggle:hover {
  transform: scale(1.1);
}

.chatbot-container {
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  width: 350px;
  max-height: 80vh;
  overflow: hidden;
  position: fixed;
  bottom: 80px;
  right: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  visibility: hidden;
  z-index: 1001;
  pointer-events: auto;
}

.chatbot-container.active {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

.questions-list {
  padding: 1rem;
}

.question-btn {
  background: #f8f9fa;
  border: none;
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  text-align: left;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.question-btn:hover {
  background: #e9ecef;
}

.question-btn.active {
  background: var(--gold);
  color: var(--navy);
}

.answer-box {
  padding: 1rem;
  background: #f8f9fa;
  border-top: 2px solid #dee2e6;
  max-height: 200px;
  overflow-y: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
      height: 50vh;
      background-size: contain;
  }

  .hero-content h1 {
      font-size: 2.5rem;
  }

  .contact-content {
      grid-template-columns: 1fr;
  }

  .clio-iframe {
      height: 400px;
      margin-top: 2rem;
  }

  .chatbot-container {
      width: 90vw;
      right: 5vw;
  }

  .inquiry-content,
  .appointment-content {
      grid-template-columns: 1fr;
  }

  .clio-form-iframe,
  .clio-calendar-iframe {
      height: 500px;
      margin-top: 2rem;
  }

  .appointment-info {
      order: -1;
  }
}

/* Prevent click events on answer box from closing chatbot */
.answer-box {
  pointer-events: none;
}

.question-btn {
  pointer-events: auto;
}

/* Client Feedback Section */
.client-feedback {
  padding: 4rem 2rem;
  background: var(--white);
  text-align: center;
}

.client-feedback h2 {
  color: var(--navy);
  margin-bottom: 2rem;
}

.feedback-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.feedback-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feedback-card:hover {
  transform: translateY(-5px);
}

.client-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

/* Client Feedback Fixes */
.client-profile img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--gold);
}

.client-info {
  text-align: left;
}

.client-info h4 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--navy);
}

.client-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--gray);
}

.rating {
  color: var(--gold);
  margin: 1rem 0;
}

.rating i {
  margin: 0 2px;
}

.feedback-text {
  font-style: italic;
  color: var(--gray);
}

/* Footer */
.footer {
  background: var(--navy);
  color: var(--white);
  padding: 2rem;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.social-links {
  margin-top: 1rem;
}

.social-links a {
  color: var(--white);
  margin: 0 0.5rem;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--gold);
}

/* Case Inquiry Section */
.case-inquiry {
  padding: 4rem 2rem;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

/* Ensure proper z-indexing */
.case-inquiry h2 {
  position: relative;
  z-index: 2;
}

.inquiry-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
}

.inquiry-benefits {
  list-style: none;
  margin: 1.5rem 0;
}

.inquiry-benefits li {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.clio-form-iframe {
  height: 700px;
  width: 100%;
  border: none;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin: 1rem 0;
}

/* Book Appointment Section */
.book-appointment {
  padding: 4rem 2rem;
  background: var(--navy);
  color: var(--white);
}

.appointment-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.clio-calendar-iframe {
  height: 600px;
  width: 100%;
  border: none;
  border-radius: 8px;
  background: white;
}

.hours-list {
  list-style: none;
  margin: 2rem 0;
}

.hours-list li {
  padding: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.appointment-notes {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
}

/* Add loading animation */
.form-container {
  position: relative;
}

.form-container::before {
  content: "Loading Secure Form...";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: var(--navy);
  font-weight: bold;
  display: none;
}

.form-container.loading::before {
  display: block;
}

.form-container.loading iframe {
  opacity: 0;
}

/* Success Modal */
.success-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1002;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  position: relative;
}

.success-icon {
  color: #28a745;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.close-modal {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Form Section */
.form-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Dynamic Field Styling */
.form-row {
  position: relative;
  transition: background 0.3s ease;
}

.form-row.primary-selected {
  background: #f8f9fa;
  border-left: 3px solid #2c3e50;
  padding-left: 10px;
}

.add-email, .add-phone, .add-address {
  display: inline-block;
  margin-top: 10px;
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
}

.add-email:hover, .add-phone:hover, .add-address:hover {
  text-decoration: underline;
}

.chosen-container {
  width: 100% !important;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  color: var(--navy);
  font-weight: 600;
}

.form-control {
  border: 2px solid var(--gray);
  border-radius: 4px;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: var(--gold);
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
}

.required label::after {
  content: " *";
  color: #e74c3c;
}

.lex-button {
  background: var(--navy);
  color: var(--white);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.lex-button:hover {
  background: var(--gold);
  transform: translateY(-2px);
}

/* Error Messages */
.error-message {
  color: #dc3545;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  width: 100%;
}

/* No-JS Warning */
.no-js-warning {
  display: none;
  background: #ff0000;
  color: white;
  padding: 1rem;
  text-align: center;
}

.no-js .no-js-warning {
  display: block;
}