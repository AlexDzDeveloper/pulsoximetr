<?php

//створюємо перемінні для роботи з інпутами
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

//для роботи з листами - вказуємо дані пошти, з якої будуть відправлятися листи
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'smtp.email1951@gmail.com';        // Наш логін
$mail->Password = '$pass625954';                     // Наш пароль від скриньки
$mail->SMTPSecure = 'ssl';
// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;                   // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                   // TCP port to connect to

$mail->setFrom('smtp.email1951@gmail.com', 'Pulse');   // Від кого лист
$mail->addAddress('pispesirdu@gufum.com');     // Кому лист
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Дані';
$mail->Body    = '
		Користувач залишив дані <br>
	Ім*я: ' . $name . ' <br>
	Номер телефону: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>