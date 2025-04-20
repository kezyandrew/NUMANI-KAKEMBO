<?php
// Test script for mail function
$to = "kaweesandrew@gmail.com";
$subject = "Test Email from Numani Kakembo Co";
$message = "This is a test email to verify that the mail function is working correctly.";
$headers = "From: test@example.com\r\n";
$headers .= "Reply-To: test@example.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Attempt to send the email
$result = mail($to, $subject, $message, $headers);

// Output the result
if ($result) {
    echo "Test email was sent successfully!";
} else {
    echo "Failed to send test email.";
    // Display the last error
    echo "<br>Error: " . error_get_last()['message'];
}
?> 