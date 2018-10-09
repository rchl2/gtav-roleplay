const Command = require('../../structures/command');

class Teleport extends Command {
  constructor (...args) {
    super(...args, {
      name: 'teleport',
      aliases: ['tp']
    });
  }

  run (player, command, args) {
    const [x, y, z] = args;
    player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
  }
}

module.exports = Teleport;
