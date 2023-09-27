class Api {
    constructor(instabot, followers, quantity) {
      this.instabot = instabot;
      this.followers = followers;
      this.quantity = quantity;
    }
  
    async start() {
      let index = 0;
      while (index < this.followers.length) {
        for (let i = 0; i < this.quantity; i++) {
          if (index < this.followers.length) {
            await this.comment(index);
            index++;
          }
        }
  
        if (index % 20 === 0) {
          console.log("Haciendo una pausa de 5 minutos...");
          await sleep(300000);
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
  