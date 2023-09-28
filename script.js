// script.js

// Importar las variables de entorno desde un archivo .env
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from './.env';

// Agregar un evento de clic al botón de login
const loginButton = document.getElementById("login");
loginButton.addEventListener("click", function() {
    // Generar la URL de autorización de la API de Instagram con los valores codificados
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user_profile,user_media&response_type=code`;
    // Abrir la URL en una nueva ventana
    const authWindow = window.open(authUrl, "_blank");
    // Esperar a que la ventana se cierre y obtener el código
    const timer = setInterval(function() {
        if (authWindow.closed) {
            clearInterval(timer);
            // Obtener el código de la URL de redirección
            const code = window.location.search.split("code=")[1];
            // Validar el código con una expresión regular
            const regex = /^[A-Za-z0-9._-]+$/;
            if (regex.test(code)) {
                // Solicitar el token de acceso con el código
                requestAccessToken(code);
            } else {
                // Mostrar un mensaje de error si el código es nulo o inválido
                alert("El código recibido no es válido. Por favor, inténtalo de nuevo.");
            }
        }
    }, 1000);
});

// Función para solicitar el token de acceso a la API de Instagram
function requestAccessToken(code) {
    // Crear la URL para la petición POST
    const tokenUrl = "https://api.instagram.com/oauth/access_token";
    // Crear los datos para el cuerpo de la petición con los valores codificados
    const data = new FormData();
    data.append("client_id", encodeURIComponent(CLIENT_ID));
    data.append("client_secret", encodeURIComponent(CLIENT_SECRET));
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", encodeURIComponent(REDIRECT_URI));
    data.append("code", encodeURIComponent(code));
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
        const accessToken = json.access_token;
        const userId = json.user_id;
        // Guardar los valores en el almacenamiento local
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        // Mostrar un mensaje de éxito o hacer otras acciones con el token
        alert(`Has iniciado sesión con éxito. Tu token de acceso es: ${accessToken}`);
    })
    .catch(function(error) {
        // Mostrar un mensaje de error o hacer otras acciones en caso de fallo
        alert(`Ha ocurrido un error al solicitar el token de acceso. El error es: ${error}`);
    });
}
