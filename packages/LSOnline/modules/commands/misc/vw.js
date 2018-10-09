const Command = require('../../structures/command');

class Vw extends Command {
  constructor (...args) {
    super(...args, {
      name: 'vw',
      aliases: ['virtualworld']
    });
  }

  run (player, command, args) {
    player.outputChatBox(`!{#dddddd} Aktualny VW: ${player.dimension}`);
  }
}

module.exports = Vw;
