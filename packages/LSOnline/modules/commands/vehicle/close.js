const Command = require('../../structures/command');
const { toggleVehicleLock } = require('../../vehicles/vehicleService');
const { getClosestVehicleForPlayer } = require('../../vehicles/vehicleService');

class Close extends Command {
  constructor (...args) {
    super(...args, {
      name: 'v z',
      aliases: ['v zamknij', 'vehicle z']
    });
  }

  run (player, command, args) {
    const vehicle = getClosestVehicleForPlayer(player, 2);
    vehicle
      ? toggleVehicleLock(vehicle, player)
      : player.call('actionDone', ['Coś poszło nie tak!', 'Nie znaleziono żadnego pojazdu w pobliżu twojej postaci!']);
  }
}

module.exports = Close;
