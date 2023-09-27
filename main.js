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
const url = "https://www.instagram.com/p/123456789/";
const cantidad = 2;
const pausa = 3600000;

// Botón de inicio de sesión
const button = document.getElementById("iniciarSesion");
button.addEventListener("click", async () => {
  // Iniciar sesión en Instagram
  const instabot = new Instabot({
    clientId,
    clientSecret,
    username,
    password,
  });

  try {
    await instabot.login();
    // Inicio de sesión exitoso
    alert("Inicio de sesión exitoso");
  } catch (error) {
    // Error de inicio de sesión
    alert(error);
  }
});

// Botón de etiquetar amigos
const button2 = document.getElementById("etiquetarAmigos");
button2.addEventListener("click", async () => {
  // Iniciar la API
  await etiquetarAmigos(url, cantidad, pausa);
});

// API
class Api {
  constructor(instabot, followers, quantity) {
    this.instabot = instabot;
    this.followers = followers;
    this.quantity = quantity;
    this.totalComments = 0;
    this.index = 0;
  }

  async start() {
    while (this.totalComments < this.followers.length) {
      // Si el índice es par, etiquetar amigos en una publicación mía
      if (this.index % 2 === 0) {
        const friend1 = this.followers[this.index];
        const friend2 = this.followers[this.index + 1];

        const comment = "@" + friend1.username + ", @" + friend2.username;

        await this.instabot.postComment(this.url, comment);
        this.index += 2;
        this.totalComments++;
      } else {
        // Si el índice es impar, etiquetar amigos en una publicación de otro
        const friend = this.followers[this.index];

        const comment = "@" + friend.username;

        await this.instabot.comment(friend.username, comment);
        this.index++;
        this.totalComments++;
      }

      if (this.totalComments % 100 === 0) {
        console.log("Haciendo una pausa de 1 hora...");
        await sleep(3600000);
      }
    }
  }

  async comment(index) {
    // ...
  }
}
