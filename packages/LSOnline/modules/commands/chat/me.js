const ChatCommand = require('./chatCommand');

class Me extends ChatCommand {
  constructor (...args) {
    super(...args, {
      name: 'me',
      aliases: ['ja'],
      args: ['Tekst']
    });
  }

  run (player, command, args) {
    const text = super.run(player, command.fullText, true, false);

    mp.players.forEachInRange(player.position, 15, player.dimension, (person) => {
      if (player.distSquared(person.position) > 10 && text) {
        person.outputChatBox(`!{${rp.config.colors.me.far}} * ${player.name} ${text}`);
      } else if (player.distSquared(person.position) >= 6 && text) {
        person.outputChatBox(`!{${rp.config.colors.me.medium}} * ${player.name} ${text}`);
      } else if (text) {
        person.outputChatBox(`!{${rp.config.colors.me.close}} * ${player.name} ${text}`);
      }
    });
  }
}

module.exports = Me;
