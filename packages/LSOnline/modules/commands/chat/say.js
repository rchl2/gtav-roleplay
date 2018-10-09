const ChatCommand = require('./chatCommand');

module.exports = class extends ChatCommand {
  constructor (...args) {
    super(...args, {
      name: 'say',
      aliases: ['l'],
      args: ['Tekst']
    });
  }

  run (player, command, args) {
    const text = super.run(player, command.fullText, true);

    mp.players.forEachInRange(player.position, 15, player.dimension, (person) => {
      if (player.distSquared(person.position) > 10 && text) {
        person.outputChatBox(`!{${rp.config.colors.say.far}}${player.name} mówi: ${text}`);
      } else if (player.distSquared(person.position) >= 6 && text) {
        person.outputChatBox(`!{${rp.config.colors.say.medium}}${player.name} mówi: ${text}`);
      } else if (text) {
        person.outputChatBox(`!{${rp.config.colors.say.close}}${player.name} mówi: ${text}`);
      }
    });
  }
};
