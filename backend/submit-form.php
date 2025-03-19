<?php
// submit-form.php

header('Content-Type: application/json');

// Environment variables
$CLIO_API_KEY = getenv('CLIO_API_KEY');
$API_ENDPOINT = 'https://app.clio.com/inbox_leads.json';

// Validate input
$requiredFields = [
    'from_first', 'from_last', 'from_email', 
    'from_phone', 'from_message', 'urgency_level',
    'area_of_law', 'referral_source'
];

$missing = array_filter($requiredFields, fn($field) => empty($_POST[$field]));

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields: ' . implode(', ', $missing)
    ]);
    exit;
}

// Prepare payload
$payload = [
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

// Send to Clio
$ch = curl_init($API_ENDPOINT);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Accept: application/vnd.clio-inbox-leads-v1+json',
        'Authorization: Bearer ' . $CLIO_API_KEY
    ],
    CURLOPT_POSTFIELDS => json_encode($payload)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Connection error: ' . curl_error($ch)
    ]);
    exit;
}

curl_close($ch);

// Handle response
if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code($httpCode);
    echo json_encode([
        'success' => false,
        'message' => 'API error: ' . $response
    ]);
}