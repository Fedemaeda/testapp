const clientId = "857862365696803";
const clientSecret = "7b9e7180931e9fe0fb6f90a7a91ae094";

async function etiquetarAmigos(url, cantidad, pausa) {
  // Obtener el nombre de usuario y la contraseña
  const username = "fedemaeda@gmail.com";
  const password = "Fedemushi20";

  // Instanciar la API
  const instabot = new Instabot({
    clientId,
    clientSecret,
    username,
    password,
  });

  // Obtener la lista de seguidores
  const followers = await instabot.getFollowers();

  // Crear la API
  const api = new Api(instabot, followers, cantidad);

  // Iniciar la API
  await api.start(pausa);
}

// Ejemplo de uso
etiquetarAmigos("https://www.instagram.com/p/123456789/", 2, 300000);
