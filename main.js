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
  try {
    await api.start(pausa);
    // Inicio de sesión exitoso
    alert("Inicio de sesión exitoso");
  } catch (error) {
    // Error de inicio de sesión
    alert(error);
  }
}

// Ejemplo de uso
const url = "https://www.instagram.com/p/123456789/";
const cantidad = document.getElementById("cantidad").value;
const pausa = 3600000;

etiquetarAmigos(url, cantidad, pausa);

// API
class Api {
  constructor(instabot, followers, quantity) {
    this.instabot = instabot;
    this.followers = followers;
    this.quantity = quantity;
    this.totalComments = 0;
  }

  async start() {
    let index = 0;
    while (index < this.followers.length) {
      for (let i = 0; i < this.quantity; i++) {
        if (index < this.followers.length) {
          await this.comment(index);
          index++;
          this.totalComments++;
        }
      }

      if (this.totalComments % 100 === 0) {
        console.log("Haciendo una pausa de 1 hora...");
        await sleep(3600000);
      }
    }
  }

  async comment(index) {
    const friend = this.followers[index];
    const comment = "@" + friend.username;

    if (index < this.quantity - 1) {
      comment += ", ";
    }

    await this.instabot.comment(this.url, comment);
  }
}
