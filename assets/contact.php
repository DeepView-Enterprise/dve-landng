<?php

/** 1. MAIN SETTINGS
*******************************************************************/


// ENTER YOUR EMAIL
$emailTo = "your@mail.com";

// ENTER IDENTIFIER
$emailIdentifier =  "Message sent via contact form from " . $_SERVER["SERVER_NAME"];


/** 2. MESSAGES
*******************************************************************/


// SUCCESS MESSAGE
$successMessage = "* Email Sent Successfully!";


/** 3. MAIN SCRIPT
*******************************************************************/


if($_POST) {
    
    $block_success = false;

    $name = addslashes(trim($_POST['name']));
    
    $clientEmail = addslashes(trim($_POST['email']));
        
    $phone = addslashes(trim($_POST['phone']));
    $phone_required = addslashes(trim($_POST['phone_required']));
    
    $address = addslashes(trim($_POST['address']));
    $address_required = addslashes(trim($_POST['address_required']));
    
    $company = addslashes(trim($_POST['company']));
    $company_required = addslashes(trim($_POST['company_required']));
    
    $subject = addslashes(trim($_POST['subject']));
    $subject_required = addslashes(trim($_POST['subject_required']));
    
    $message = addslashes(trim($_POST['message']));
    
    $antiSpamHPC = addslashes(trim($_POST['country']));
    
    
    $array = array('nameMessage' => '', 'emailMessage' => '', 'subjectMessage' => '', 'companyMessage' => '', 'addressMessage' => '', 'phoneMessage' => '', 'messageMessage' => '', 'succesMessage' => '');

    if( $name === '' ) {
        $array['nameMessage'] = 'error';
        $block_success = true;
    }

    if( !filter_var( $clientEmail, FILTER_VALIDATE_EMAIL ) ) {
        $array['emailMessage'] = 'error';
        $block_success = true;
    }
    
    if( $subject === '' && $subject_required === 'true' ) {
        $array['subjectMessage'] = 'error';
        $block_success = true;
    }

    if( $phone === '' && $phone_required === 'true' ) {
        $array['phoneMessage'] = 'error';
        $block_success = true;
    }

    if( $address === '' && $address_required === 'true' ) {
        $array['addressMessage'] = 'error';
        $block_success = true;
    }

    if( $company === '' && $company_required === 'true' ) {
        $array['companyMessage'] = 'error';
        $block_success = true;
    }

    if( $message === '' ) {
        $array['messageMessage'] = 'error';
        $block_success = true;
    }

    
    if( $block_success === false && $antiSpamHPC === "" ) {	
        
        $message_body = "";
        
        $array["succesMessage"] = $successMessage;

        $headers= "MIME-Version: 1.0" . "\r\n";
        $headers.= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers= "From: " . $name . " <" . $clientEmail .">\r\n";
        $headers.= "Reply-To: " . $clientEmail;
        
        
        if( $subject !== '' ) {
            $message_body .= "Subject: " . $subject . "\r\n";
        }
        
        if( $phone !== '' ) {
            $message_body .= "Phone: " . $phone . "\r\n";
        }
        
        if( $company !== '' ) {
            $message_body .= "Company: " . $company . "\r\n";
        }
        
        if( $address !== '' ) {
            $message_body .= "Address: " . $address . "\r\n";
        }
        
        $message_body .= "\r\n" . $message;
        

        mail($emailTo, $emailIdentifier, $message_body, $headers);

    }

    echo json_encode($array);

}

?>