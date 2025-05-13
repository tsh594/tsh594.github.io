<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        script-src 'self' https://code.jquery.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;
        style-src 'self' https://cdnjs.cloudflare.com 'unsafe-inline';
        img-src 'self' data:;
        connect-src 'self' https://app.clio.com https://corsproxy.io;
        frame-src https://hayslawva.cliogrow.com;
    ">
    <title>Jon F. Hays Law Firm</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="no-js">
    <div class="no-js-warning">
        JavaScript is required to use this website. Please enable JavaScript in your browser.
    </div>

    <!-- Logo Section -->
    <header class="logo-header">
        <div class="logo-container">
            <img src="./assets/Logo.JPG" alt="Jon F. Hays Law Firm Logo" class="logo">
            <div class="logo-text">
                <span class="logo-name">Jon F. Hays</span>
                <span class="logo-tagline">Law Firm</span>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Jon F. Hays Law Firm</h1>
            <p class="tagline">Trusted Legal Counsel Since 2013</p>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services">
        <h2>Practice Areas</h2>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon"><i class="fas fa-file-contract"></i></div>
                <h3>Estate Planning</h3>
                <p>Wills, trusts, and probate administration</p>
            </div>
            <div class="service-card">
                <div class="service-icon"><i class="fas fa-users"></i></div>
                <h3>Family Law</h3>
                <p>Divorce, child custody, and support matters</p>
            </div>
            <div class="service-card">
                <div class="service-icon"><i class="fas fa-gavel"></i></div>
                <h3>Simple Criminal Law</h3>
                <p>Traffic violations, DUIs, and minor criminal offenses</p>
            </div>
        </div>
    </section>

    <!-- Client Feedback Section -->
    <section class="client-feedback">
        <h2>What Our Clients Say</h2>
        <div class="feedback-grid"><!-- JS injected --></div>
    </section>

    <!-- Case Inquiry Section -->
    <section class="case-inquiry">
        <h2>Submit Case Information</h2>
        <div class="inquiry-content">
            <div class="inquiry-info">
                <h3>Confidential Case Review</h3>
                <p>Use this secure form to:</p>
                <ul class="inquiry-benefits">
                    <li><i class="fas fa-check-circle"></i> Submit case details privately</li>
                    <li><i class="fas fa-check-circle"></i> Ask preliminary questions</li>
                    <li><i class="fas fa-check-circle"></i> Upload relevant documents</li>
                    <li><i class="fas fa-check-circle"></i> Request call back</li>
                </ul>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <p>+1 (571) 781-2460</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <p>jon.hays@hayslawva.com</p>
                        <p>info@hayslawva.com</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="address">
                            <p>40582 Sculpin Court</p>
                            <p>Aldie, VA 20105</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Section -->
            <div class="form-container">
                <form class="simple_form new_intake_form" id="leadForm">
                    <div class="error-messages"></div>
                    <input type="hidden" id="referring_url" name="referring_url" value="https://hayslawva-test.me">
                    <input type="hidden" id="from_source" name="from_source" value="Hays Law Firm Website">
                    <input type="hidden" id="inbox_lead_token" name="inbox_lead_token" value="82d68da5d013ef36e1a8e76ec35d6fb6">

                    <!-- Contact Information -->
                    <div class="form-section">
                        <h3>Contact Information</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Prefix</label>
                                <input type="text" name="prefix" class="form-control">
                            </div>
                            <div class="form-group required">
                                <label>First Name *</label>
                                <input type="text" name="from_first" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Middle Name</label>
                                <input type="text" name="middle_name" class="form-control">
                            </div>
                            <div class="form-group required">
                                <label>Last Name *</label>
                                <input type="text" name="from_last" class="form-control" required>
                            </div>
                        </div>
                    </div>

                    <!-- Email Section -->
                    <div class="form-section">
                        <h3>Emails</h3>
                        <div class="email-group">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Email Address *</label>
                                    <input type="email" name="from_email" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Type</label>
                                    <select name="email_type" class="form-control chosen-select">
                                        <option value="home">Home</option>
                                        <option value="work">Work</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Primary</label>
                                    <input type="radio" name="default_email" value="true" checked>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="add-email">Add Email +</button>
                    </div>

                    <!-- Address Section -->
                    <div class="form-section">
                        <h3>Address</h3>
                        <div class="address-group">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Street Address</label>
                                    <textarea name="street" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Country</label>
                                    <select name="country" class="form-control chosen-select">
                                        <option value="US">United States</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>City</label>
                                    <input type="text" name="city" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>State</label>
                                    <select name="state" class="form-control chosen-select">
                                        <option value="VA">Virginia</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>ZIP Code</label>
                                    <input type="text" name="postal_code" class="form-control">
                                </div>
                            </div>
                        </div>
                        <button type="button" class="add-address">Add Address +</button>
                    </div>

                    <!-- Phone Numbers Section -->
                    <div class="form-section">
                        <h3>Phone Numbers</h3>
                        <div class="phone-group">
                            <div class="form-row">
                                <div class="form-group required">
                                    <label>Phone Number *</label>
                                    <input type="tel" name="from_phone" class="form-control phone-input" required>
                                </div>
                                <div class="form-group">
                                    <label>Type</label>
                                    <select name="phone_type" class="form-control chosen-select">
                                        <option value="home">Home</option>
                                        <option value="work">Work</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Primary</label>
                                    <input type="radio" name="default_phone" value="true" checked>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="add-phone">Add Phone Number +</button>
                    </div>

                    <!-- Case Details -->
                    <div class="form-section">
                        <h3>Case Details</h3>
                        <div class="form-group">
                            <label>Area of Law</label>
                            <select name="area_of_law" class="form-control chosen-select">
                                <option value="Criminal Law">Criminal Law</option>
                                <option value="Family Law">Family Law</option>
                                <option value="Wills/Trust/Estates">Wills/Trust/Estates</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Brief Description of Legal Issue</label>
                            <input type="text" name="from_message" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Urgency Level</label>
                            <select name="urgency_level" class="form-control chosen-select">
                                <option value="Routine">Routine</option>
                                <option value="Time-Sensitive">Time-Sensitive</option>
                                <option value="Emergency">Emergency</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>How Did You Hear About Us?</label>
                            <select name="referral_source" class="form-control chosen-select">
                                <option value="Google">Google</option>
                                <option value="Referral">Referral</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <!-- Submission Buttons -->
                    <div class="form-actions">
                        <button type="submit" class="lex-button lex-button-blue">Submit</button>
                        <button type="button" class="lex-button lex-button-gray">Save Progress</button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Book Appointment Section -->
    <section class="book-appointment">
        <h2>Schedule Consultation</h2>
        <div class="appointment-content">
            <div class="calendar-container">
                <iframe
                    title="Clio Calendar"
                    src="https://hayslawva.cliogrow.com/calendar/embed"
                    class="clio-calendar-iframe"
                    id="bookingCalendar"
                ></iframe>
            </div>
            <div class="appointment-info">
                <h3>Office Hours</h3>
                <ul class="hours-list">
                    <li><i class="fas fa-clock"></i> Mon-Fri: 9:00 AM - 5:00 PM</li>
                    <li><i class="fas fa-calendar-check"></i> Saturday: By Appointment</li>
                    <li><i class="fas fa-exclamation-triangle"></i> Emergency: Call (571) 781-2460</li>
                </ul>
                <div class="appointment-notes">
                    <p><i class="fas fa-lock"></i> All appointments are confidential</p>
                    <p><i class="fas fa-video"></i> Virtual meetings available</p>
                    <p><i class="fas fa-clock"></i> 24-hour cancellation policy</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Success Modal -->
    <div class="success-modal" id="successModal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <i class="fas fa-check-circle success-icon"></i>
            <h3>Submission Received!</h3>
            <p>We'll respond within 1 business day.</p>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2023 Jon F. Hays Law Firm. All rights reserved.</p>
            <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    </footer>

    <!-- Chatbot -->
    <div class="floating-chatbot">
        <button class="chatbot-toggle">
            <i class="fas fa-comments"></i>
        </button>
        <div class="chatbot-container"></div>
    </div>

    <!-- Dependencies -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cleave.js@1.6.0/dist/cleave.min.js"></script>
    <script src="script.js?v=4"></script>
</body>
</html>