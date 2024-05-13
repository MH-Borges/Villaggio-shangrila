<?php
    $nome = addslashes($_POST['nome']);
    $email = filter_var(addslashes($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefone = addslashes($_POST['telefone']);
    @$planta = $_POST['planta_select'];

    if($nome == ""){
        echo "Preencha o campo de 'Nome completo'";
        exit();
    }
    if($email == ""){
        echo "Preencha o campo de E-mail";
        exit();
    }
    if($planta == NULL || $planta == ''){
        echo 'Por favor selecione uma planta';
        exit();
    }

    if($planta == 'C2'){  $planta = "Casa com 2 quartos"; }
    if($planta == 'C3'){  $planta = "Casa com 3 quartos"; }

    $mensagem = 'Tenho interesse na '.$planta;  

    $to = "universofarol@outlook.com";
    $subject = "Contato cliente ($nome) - Formulario Landing Page";
    $body = utf8_decode(
        'Nome: ' .$nome. "\r\n"."\r\n".
        'Email: ' .$email. "\r\n"."\r\n".
        'Telefone: '.$telefone. "\r\n"."\r\n".
        'Mensagem:'. "\r\n"."\r\n". $mensagem
    );

    $header = 'From:contato@universofarol.com.br'."\r\n"."Reply-To:".$email;

    if(mail($to,$subject,$body,$header)){
        echo ("Formulario enviado com sucesso! Entraremos em contato em breve, obrigado por nos escolher!");
    }

?>