const ChatCommand = require('./chatCommand');

class Do extends ChatCommand {
  constructor (...args) {
    super(...args, {
      name: 'do',
      args: ['Tekst']
    });
  }

  run (player, command, args) {
    const text = super.run(player, command.fullText, true);

    if (text) {
      mp.players.broadcastInRange(player.position, 15, player.dimension, `!{${rp.config.colors.do}} * ${text} (( ${player.name} ))`);
    }
  }
}

module.exports = Do;
