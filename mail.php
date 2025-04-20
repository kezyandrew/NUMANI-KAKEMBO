<?php
    // Enable error reporting for debugging
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // Log access to this file for debugging
    $access_log = fopen('mail_access.log', 'a');
    fwrite($access_log, date('Y-m-d H:i:s') . " - Script accessed with method: " . $_SERVER['REQUEST_METHOD'] . "\n");
    
    // Prevent direct script access if accessed directly instead of through form submission
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        fwrite($access_log, date('Y-m-d H:i:s') . " - Invalid request method\n");
        fclose($access_log);
        http_response_code(403);
        echo "Invalid request method. Please submit the form properly.";
        exit;
    }

    // Log POST data
    fwrite($access_log, date('Y-m-d H:i:s') . " - POST data received: " . print_r($_POST, true) . "\n");
    
    // Set recipient email
    $mail_to = "kaweesandrew@gmail.com";
    
    // Get and sanitize form data
    $subject = isset($_POST["subject"]) ? htmlspecialchars(trim($_POST["subject"])) : '';
    $phone = isset($_POST["phone"]) ? htmlspecialchars(trim($_POST["phone"])) : '';
    $name = isset($_POST["name"]) ? htmlspecialchars(str_replace(array("\r","\n"),array(" "," "), strip_tags(trim($_POST["name"])))) : '';
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST["message"]) ? htmlspecialchars(trim($_POST["message"])) : '';
    
    // Log sanitized data
    fwrite($access_log, date('Y-m-d H:i:s') . " - Sanitized data: Name=$name, Email=$email, Subject=$subject, Phone=$phone\n");
    
    // Email subject prefix for better organization
    $email_subject = "Numani Kakembo Co Contact: $subject";
    
    // Form validation
    if (empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($subject) OR empty($message)) {
        fwrite($access_log, date('Y-m-d H:i:s') . " - Form validation failed\n");
        fclose($access_log);
        http_response_code(400);
        echo "Please complete all required fields and try again.";
        exit;
    }
    
    // Prepare email content
    $content = "Name: $name\n";
    $content .= "Topic: $subject\n";
    $content .= "Phone: $phone\n";
    $content .= "Email: $email\n\n";
    $content .= "Message:\n$message\n";

    // Set up email headers for better deliverability
    $headers = array();
    $headers[] = "From: Numani Kakembo Co <noreply@numanikakembo.co>";  // Changed to not use user's email as From
    $headers[] = "Reply-To: $name <$email>";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/plain; charset=UTF-8";
    
    // Convert headers array to string
    $headers_string = implode("\r\n", $headers);

    // Log before sending mail
    fwrite($access_log, date('Y-m-d H:i:s') . " - Attempting to send email with headers: " . print_r($headers, true) . "\n");
    
    // Send the email
    $success = mail($mail_to, $email_subject, $content, $headers_string);
    
    // Log mail send result
    fwrite($access_log, date('Y-m-d H:i:s') . " - Mail send result: " . ($success ? "Success" : "Failed") . "\n");
    
    if ($success) {
        fwrite($access_log, date('Y-m-d H:i:s') . " - Email sent successfully\n");
        fclose($access_log);
        http_response_code(200);
        echo "Thank you! Your message has been sent successfully.";
        
        // Optional: Log successful submissions
        error_log("Contact form submission from $name <$email>");
    } else {
        $error = error_get_last();
        fwrite($access_log, date('Y-m-d H:i:s') . " - Failed to send email. Error: " . print_r($error, true) . "\n");
        fclose($access_log);
        http_response_code(500);
        echo "Sorry, something went wrong. Please try again or contact us directly.";
        
        // Log the error for troubleshooting
        error_log("Failed to send contact form from $name <$email>: " . (isset($error['message']) ? $error['message'] : 'Unknown error'));
    }
?>
