const Command = require('../structures/command');

class Ping extends Command {
  constructor (...args) {
    super(...args, {
      name: 'ping',
      aliases: ['pong']
    });
  }

  async run (player, command, args) {
    player.outputChatBox('Pong!');
  }
}

module.exports = Ping;
