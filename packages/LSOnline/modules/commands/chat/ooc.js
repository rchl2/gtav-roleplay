const ChatCommand = require('./chatCommand');

module.exports = class extends ChatCommand {
  constructor (...args) {
    super(...args, {
      name: 'b',
      aliases: ['ooc'],
      args: ['Tekst']
    });
  }

  run (player, command, args) {
    const text = super.run(player, command.fullText, false, false);

    if (text) {
      mp.players.broadcastInRange(player.position, 6, player.dimension, `!{${rp.config.colors.ooc}}(( ${player.name} (${player.id}): ${text} ))`);
    }
  }
};
