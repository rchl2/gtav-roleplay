const Command = require('../../../structures/command');
const { respawnAll } = require('../../../vehicles/vehicleManager');

class Respawn extends Command {
  constructor (...args) {
    super(...args, {
      name: 'respawn'
    });
  }

  async run (player, command, args) {
    await respawnAll();
    mp.players.broadcast(`(( Respawn pojazdów! Wszystkie powróciły na swoje miejsca parkingowe. ))`);
  }
}

module.exports = Respawn;
