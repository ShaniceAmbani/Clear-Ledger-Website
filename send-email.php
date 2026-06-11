<?php
// Email configuration
$to = 'info@clearledger.co.ke';
$website_name = 'ClearLedger Consultants Limited';

// Set headers to prevent direct access
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(json_encode(['success' => true]));
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['success' => false, 'message' => 'Method not allowed']));
}

// Get form data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$service = isset($_POST['service']) ? sanitize_input($_POST['service']) : '';
$position = isset($_POST['position']) ? sanitize_input($_POST['position']) : '';
$experience = isset($_POST['experience']) ? sanitize_input($_POST['experience']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
$cover_letter = isset($_POST['cover_letter']) ? sanitize_input($_POST['cover_letter']) : '';
$expertise = isset($_POST['expertise']) ? sanitize_input($_POST['expertise']) : '';

// Validate required fields
if (empty($name) || empty($email)) {
    http_response_code(400);
    exit(json_encode(['success' => false, 'message' => 'Name and email are required']));
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit(json_encode(['success' => false, 'message' => 'Invalid email address']));
}

// Determine email subject and content based on form type
if (!empty($service)) {
    // Service inquiry form
    $subject = "New Service Inquiry: $service - $website_name";
    $body = build_service_email($name, $email, $phone, $service, $message);
} elseif (!empty($position)) {
    // Job application form
    $subject = "New Job Application: $position - $website_name";
    $body = build_job_email($name, $email, $phone, $position, $experience, $cover_letter);
} else {
    // General contact form
    $subject = "New Contact Message from $name - $website_name";
    $body = build_contact_email($name, $email, $phone, $message);
}

// Email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: $email" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// Send email
$mail_sent = mail($to, $subject, $body, $headers);

if ($mail_sent) {
    http_response_code(200);
    exit(json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']));
} else {
    http_response_code(500);
    exit(json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.']));
}

// Sanitize user input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Build service inquiry email body
function build_service_email($name, $email, $phone, $service, $message) {
    $body = "<!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #f8fafc; padding: 20px; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1e40af; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Service Inquiry</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span> $name
                </div>
                <div class='field'>
                    <span class='label'>Email:</span> $email
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span> $phone
                </div>
                <div class='field'>
                    <span class='label'>Service Interest:</span> $service
                </div>
                <div class='field'>
                    <span class='label'>Message:</span> " . nl2br($message) . "
                </div>
            </div>
        </div>
    </body>
    </html>";
    return $body;
}

// Build job application email body
function build_job_email($name, $email, $phone, $position, $experience, $cover_letter) {
    $body = "<!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #f8fafc; padding: 20px; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1e40af; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Job Application</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span> $name
                </div>
                <div class='field'>
                    <span class='label'>Email:</span> $email
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span> $phone
                </div>
                <div class='field'>
                    <span class='label'>Position:</span> $position
                </div>
                <div class='field'>
                    <span class='label'>Years of Experience:</span> $experience
                </div>
                <div class='field'>
                    <span class='label'>Cover Letter:</span> " . nl2br($cover_letter) . "
                </div>
            </div>
        </div>
    </body>
    </html>";
    return $body;
}

// Build contact form email body
function build_contact_email($name, $email, $phone, $message) {
    $body = "<!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #f8fafc; padding: 20px; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1e40af; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Message</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span> $name
                </div>
                <div class='field'>
                    <span class='label'>Email:</span> $email
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span> $phone
                </div>
                <div class='field'>
                    <span class='label'>Message:</span> " . nl2br($message) . "
                </div>
            </div>
        </div>
    </body>
    </html>";
    return $body;
}
?>
