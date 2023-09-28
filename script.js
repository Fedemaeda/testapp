// script.js

// Declarar las variables con los valores del cliente
var CLIENT_ID = "857862365696803";
var CLIENT_SECRET = "7b9e7180931e9fe0fb6f90a7a91ae094";
var REDIRECT_URI = "https://instatestapp.netlify.app/";

// Agregar un evento de clic al botón de login
var loginButton = document.getElementById("login");
loginButton.addEventListener("click", function() {
    // Generar la URL de autorización de la API de Instagram
    var authUrl = "https://api.instagram.com/oauth/authorize?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&scope=user_profile,user_media&response_type=code";
    // Abrir la URL en una nueva ventana
    var authWindow = window.open(authUrl, "_blank");
    // Esperar a que la ventana se cierre y obtener el código
    var timer = setInterval(function() {
        if (authWindow.closed) {
            clearInterval(timer);
            // Obtener el código de la URL de redirección
            var code = window.location.search.split("code=")[1];
            // Solicitar el token de acceso con el código
            requestAccessToken(code);
        }
    }, 1000);
});

// Función para solicitar el token de acceso a la API de Instagram
function requestAccessToken(code) {
    // Crear la URL para la petición POST
    var tokenUrl = "https://api.instagram.com/oauth/access_token";
    // Crear los datos para el cuerpo de la petición
    var data = new FormData();
    data.append("client_id", CLIENT_ID);
    data.append("client_secret", CLIENT_SECRET);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", REDIRECT_URI);
    data.append("code", code);
    // Hacer la petición POST con fetch
    fetch(tokenUrl, {
        method: "POST",
        body: data
    })
    .then(function(response) {
        // Convertir la respuesta a JSON
        return response.json();
    })
    .then(function(json) {
        // Obtener el token de acceso y el id del usuario del JSON
        var accessToken = json.access_token;
        var userId = json.user_id;
        // Guardar los valores en el almacenamiento local
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        // Mostrar un mensaje de éxito o hacer otras acciones con el token
        alert("Has iniciado sesión con éxito. Tu token de acceso es: " + accessToken);
    })
    .catch(function(error) {
        // Mostrar un mensaje de error o hacer otras acciones en caso de fallo
        alert("Ha ocurrido un error al solicitar el token de acceso. El error es: " + error);
    });
}
