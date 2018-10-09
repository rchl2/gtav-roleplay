const ChatCommand = require('./chatCommand');

class Shout extends ChatCommand {
  constructor (...args) {
    super(...args, {
      name: 'k',
      aliases: ['krzyk'],
      args: ['Tekst']
    });
  }

  run (player, command, args) {
    const text = super.run(player, command.fullText);

    if (text) {
      mp.players.broadcastInRange(player.position, 25, player.dimension, `!{${rp.config.colors.say}} ${player.name} krzyczy: ${text}!`);
    }
  }
}

module.exports = Shout;
