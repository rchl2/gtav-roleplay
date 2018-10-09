const Command = require('../../structures/command');
const { isVehicleDriver } = require('../../player/playerMisc');
const { toggleVehicleEngine } = require('../../vehicles/vehicleService');

class Engine extends Command {
  constructor (...args) {
    super(...args, {
      name: 'engine',
      aliases: ['silnik']
    });
  }

  run (player, command, args) {
    isVehicleDriver(player)
      ? setTimeout(() => toggleVehicleEngine(player.vehicle, player), player.vehicle.engine ? 0 : 1500)
      : player.call('actionDone', ['Coś poszło nie tak!', 'Musisz być w pojeździe jako kierowca, aby móc uruchomić silnik!']);
  }
}

module.exports = Engine;
