const Command = require('../../../structures/command');
const { create } = require('../../../doors/doorManager');

class Door extends Command {
  constructor (...args) {
    super(...args, {
      name: 'ad',
      aliases: ['adoor', 'ad create'],
      hasSubcommands: true,
      args: ['Nazwa drzwi']
    });
  }

  async run (player, command, args) {
    const [doorName] = args;

    await create(player, doorName);
  }
}

module.exports = Door;
