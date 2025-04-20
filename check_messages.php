<?php
// Secure this page with a simple password
$password = 'numani2024';

if (!isset($_POST['password']) || $_POST['password'] !== $password) {
    // Show login form
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Message Viewer - Login</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f9fc; }
            .login-form { background: white; padding: 30px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 300px; }
            h1 { margin-top: 0; color: #223a66; font-size: 24px; }
            input[type="password"] { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 3px; }
            button { background: #223a66; color: white; border: none; padding: 10px 15px; border-radius: 3px; cursor: pointer; }
            button:hover { background: #1a2d4e; }
        </style>
    </head>
    <body>
        <div class="login-form">
            <h1>Message Viewer Login</h1>
            <form method="post">
                <input type="password" name="password" placeholder="Enter password" required>
                <button type="submit">Login</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// If we get here, password is correct
$messagesFile = 'contact_messages.txt';
$messages = [];

if (file_exists($messagesFile)) {
    $lines = file($messagesFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $messages[] = json_decode($line, true);
    }
}

// Reverse the array to show newest messages first
$messages = array_reverse($messages);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Form Messages</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f9fc; }
        h1 { color: #223a66; }
        .message { background: white; margin-bottom: 20px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .message-header { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px; }
        .message-meta { color: #6c757d; font-size: 14px; }
        .message-subject { font-weight: bold; color: #223a66; }
        .message-body { white-space: pre-line; }
        .message-error { color: #dc3545; margin-top: 10px; padding: 10px; background-color: #f8d7da; border-radius: 3px; }
        .no-messages { text-align: center; padding: 50px; color: #6c757d; }
    </style>
</head>
<body>
    <h1>Contact Form Messages</h1>
    
    <?php if (empty($messages)): ?>
        <div class="no-messages">No messages found</div>
    <?php else: ?>
        <?php foreach ($messages as $message): ?>
            <div class="message">
                <div class="message-header">
                    <div class="message-subject"><?php echo htmlspecialchars($message['subject']); ?></div>
                    <div class="message-meta"><?php echo htmlspecialchars($message['date']); ?></div>
                </div>
                <div>
                    <strong>From:</strong> <?php echo htmlspecialchars($message['name']); ?> &lt;<?php echo htmlspecialchars($message['email']); ?>&gt;
                </div>
                <?php if (!empty($message['phone'])): ?>
                    <div><strong>Phone:</strong> <?php echo htmlspecialchars($message['phone']); ?></div>
                <?php endif; ?>
                <div class="message-body">
                    <strong>Message:</strong><br>
                    <?php echo htmlspecialchars($message['message']); ?>
                </div>
                <?php if (isset($message['error'])): ?>
                    <div class="message-error">
                        <strong>Error:</strong> <?php echo htmlspecialchars($message['error']); ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html> 