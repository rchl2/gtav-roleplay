const Command = require('../../../structures/command');
const { refuel } = require('../../../vehicles/vehicleManager');

class Fuel extends Command {
  constructor (...args) {
    super(...args, {
      name: 'avehicle fuel',
      aliases: ['aveh fuel', 'av fuel'],
      args: ['ID pojazdu z gry', 'Ilość dodanego paliwa']
    });
  }

  async run (player, command, args) {
    const [vehicleId, fuel] = args;
    const vehicle = mp.vehicles.at(vehicleId);

    if (vehicle) {
      vehicle.informations.fuel = parseFloat(vehicle.informations.fuel) + parseFloat(fuel);
      await refuel(vehicle.informations.id, fuel);

      player.call('actionDone', [
        'Komendy administracyjne',
        'Stan paliwa pojazdu ' + vehicle.informations.name + ' (ID: ' + vehicle.informations.id + ') został pomyślnie zaktualizowany!'
      ]);
    } else {
      return player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${command.name} ${this.tooltip}`]);
    }
  }
}

module.exports = Fuel;
