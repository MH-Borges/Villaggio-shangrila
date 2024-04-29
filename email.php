<?php

    $nome = addslashes($_POST['nome']);
    $email = filter_var(addslashes($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefone = addslashes($_POST['telefone']);
    $planta = addslashes($_POST['planta_select']);

    var_dump($nome);

    if($nome == ""){
        echo 'Preencha o Campo de Nome';
        exit();
    }
    if($email == ""){
        echo 'Preencha o Campo do Email';
        exit();
    }

    $to = "universofarol@outlook.com";
    $subject = "Contato cliente ($nome) - $assunto";
    $body = utf8_decode(
        'Nome: ' .$nome. "\r\n"."\r\n".
        'Email: ' .$email. "\r\n"."\r\n".
        'Telefone: '.$telefone. "\r\n"."\r\n".
        'Mensagem:'. "\r\n"."\r\n". $mensagem
    );

    $header = 'From:contato@universofarol.com.br'."\r\n".
            "Reply-To:".$email;

    if(mail($to,$subject,$body,$header)){
        echo ("Email enviado com sucesso!");
    }

?>