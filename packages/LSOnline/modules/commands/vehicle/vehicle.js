const Command = require('../../structures/command');

class Vehicle extends Command {
  constructor (...args) {
    super(...args, {
      name: 'v',
      aliases: ['v', 'vehicle', 'pojazd'],
      hasSubcommands: true,
      args: []
    });
  }

  async run (player, command, args) {
    player.outputChatBox('todo');
  }
}

module.exports = Vehicle;
