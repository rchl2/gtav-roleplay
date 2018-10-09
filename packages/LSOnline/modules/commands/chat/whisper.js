const ChatCommand = require('./chatCommand');

class Me extends ChatCommand {
  constructor (...args) {
    super(...args, {
      name: 'c',
      aliases: ['szept'],
      args: ['Tekst']
    });
  }

  run (player, command, args) {
    const text = super.run(player, command.fullText, true);

    if (text) {
      mp.players.broadcastInRange(player.position, 4, player.dimension, `!{${rp.config.colors.whisper}} ${player.name} szepcze: ${text}`);
    }
  }
}

module.exports = Me;
