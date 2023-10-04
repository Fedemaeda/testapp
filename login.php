<?php
  // Importar la biblioteca de Google OAuth 2.0
  require_once 'vendor/autoload.php';

  // Crear un cliente de Google OAuth 2.0
  $client = new Google\Client();
  $client->setAuthConfig('credentials.json');

  // Iniciar sesión
  if (!isset($_GET['code'])) {
    // Redirigir al usuario a la página de inicio de sesión de Google
    $authUrl = $client->createAuthUrl();
    header('Location: ' . $authUrl);
    exit();
  } else {
    // Obtener el token de acceso del usuario
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);

    // Guardar el token de acceso en la sesión
    $_SESSION['token'] = $token;

    // Redirigir al usuario a la página principal
    header('Location: index.php');
    exit();
  }
?>
