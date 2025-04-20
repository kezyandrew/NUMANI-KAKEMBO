<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Start logging
$log_file = 'email_log.txt';
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Email script started\n", FILE_APPEND);

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Invalid request method: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);
    http_response_code(405);
    echo "Method not allowed";
    exit;
}

// Log the POST data
file_put_contents($log_file, date('Y-m-d H:i:s') . " - POST data: " . print_r($_POST, true) . "\n", FILE_APPEND);

// Get form data
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

// Validate form data
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Missing required fields\n", FILE_APPEND);
    http_response_code(400);
    echo "Please fill all required fields";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Invalid email: $email\n", FILE_APPEND);
    http_response_code(400);
    echo "Invalid email address";
    exit;
}

// Prepare email
$to = 'kaweesandrew@gmail.com';
$email_subject = "Numani Kakembo Co Contact: $subject";

// Prepare email body
$email_body = "You have received a new message from the contact form on your website.\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Subject: $subject\n\n";
$email_body .= "Message:\n$message\n";

// Prepare headers
$headers = "From: Numani Kakembo Co <noreply@numanikakembo.co>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Log the attempt
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Attempting to send email to: $to\n", FILE_APPEND);
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Email subject: $email_subject\n", FILE_APPEND);
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Email headers: $headers\n", FILE_APPEND);

// Send email
$mail_sent = mail($to, $email_subject, $email_body, $headers);

if ($mail_sent) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Email sent successfully\n", FILE_APPEND);
    
    // Also save the message to a backup file as a failsafe
    $backup_data = [
        'date' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message
    ];
    
    file_put_contents('contact_messages.txt', json_encode($backup_data) . "\n", FILE_APPEND);
    
    // Check if request is AJAX or direct form submission
    $is_ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    
    if ($is_ajax) {
        // Return success for AJAX request
        http_response_code(200);
        echo "Thank you! Your message has been sent successfully.";
    } else {
        // Redirect back to contact page with success message for non-AJAX
        header('Location: contact.html?status=success');
        exit;
    }
} else {
    $error = error_get_last();
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Failed to send email. Error: " . print_r($error, true) . "\n", FILE_APPEND);
    
    // Save the message anyway to avoid losing customer communication
    $backup_data = [
        'date' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message,
        'error' => isset($error['message']) ? $error['message'] : 'Unknown error'
    ];
    
    file_put_contents('contact_messages.txt', json_encode($backup_data) . "\n", FILE_APPEND);
    
    // Check if request is AJAX or direct form submission
    $is_ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    
    if ($is_ajax) {
        // Return error for AJAX request
        http_response_code(500);
        echo "There was a problem sending your message. However, we've saved your message and will get back to you soon.";
    } else {
        // Redirect back to contact page with error message for non-AJAX
        header('Location: contact.html?status=error');
        exit;
    }
}
?> 