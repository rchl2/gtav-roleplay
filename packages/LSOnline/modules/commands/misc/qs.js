const Command = require('../../structures/Command.js');

class Qs extends Command {
  constructor (...args) {
    super(...args, {
      name: 'qs',
      aliases: ['qs']
    });
  }

  run (player, command, args) {
    player.kick('/qs');
  }
}

module.exports = Qs;
