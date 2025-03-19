<?php
// submit-form.php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log the start of the script
error_log('Form submission script started.');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log('Invalid request method. Expected POST.');
    echo json_encode(['success' => false, 'message' => 'Invalid request method. Expected POST.']);
    exit;
}

// Log the received POST data
error_log('Received POST data: ' . print_r($_POST, true));

// Validate required fields
$requiredFields = ['from_first', 'from_last', 'from_email', 'from_phone', 'from_message', 'urgency_level', 'area_of_law', 'referral_source', 'inbox_lead_token', 'referring_url', 'from_source'];
$missingFields = [];

foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        $missingFields[] = $field;
    }
}

if (!empty($missingFields)) {
    error_log('Missing required fields: ' . implode(', ', $missingFields));
    echo json_encode(['success' => false, 'message' => 'Missing required fields: ' . implode(', ', $missingFields)]);
    exit;
}

// Prepare the data for the Clio API
$data = [
    'inbox_lead' => [
        'from_first' => $_POST['from_first'],
        'from_last' => $_POST['from_last'],
        'from_email' => $_POST['from_email'],
        'from_phone' => $_POST['from_phone'],
        'from_message' => $_POST['from_message'],
        'custom_fields' => [
            'urgency_level' => $_POST['urgency_level'],
            'area_of_law' => $_POST['area_of_law'],
            'referral_source' => $_POST['referral_source']
        ]
    ],
    'inbox_lead_token' => $_POST['inbox_lead_token'],
    'referring_url' => $_POST['referring_url'],
    'from_source' => $_POST['from_source']
];

// Log the prepared data
error_log('Prepared data for Clio API: ' . print_r($data, true));

// Set API endpoint and headers
$url = 'https://app.clio.com/inbox_leads.json';
$headers = [
    'Content-Type: application/json',
    'Accept: application/vnd.clio-inbox-leads-v1+json',
    'Authorization: Bearer ' . $_ENV['CLIO_API_KEY'] // Use environment variable for API key
];

// Log the environment variable and headers
error_log('CLIO_API_KEY: ' . $_ENV['CLIO_API_KEY']);
error_log('Headers: ' . print_r($headers, true));

// Initialize cURL session
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response as a string
curl_setopt($ch, CURLOPT_POST, true); // Use POST method
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Send JSON data
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); // Set headers

// Execute the cURL request
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    $error_message = curl_error($ch);
    error_log('cURL error: ' . $error_message);
    echo json_encode(['success' => false, 'message' => 'cURL error: ' . $error_message]);
    exit;
}

// Get the HTTP status code
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close the cURL session
curl_close($ch);

// Log the raw response
error_log('Raw API response: ' . $response);

// Check if the response is valid JSON
$responseData = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log('Invalid JSON response: ' . $response);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON response from server.']);
    exit;
}

// Handle the response
if ($httpCode === 200) {
    error_log('Form submitted successfully!');
    echo json_encode(['success' => true, 'message' => 'Form submitted successfully!']);
} else {
    error_log('Form submission failed. HTTP code: ' . $httpCode);
    echo json_encode(['success' => false, 'message' => 'Form submission failed. HTTP code: ' . $httpCode]);
}
?>