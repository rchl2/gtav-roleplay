const Command = require('../../../structures/command');
const { updateName } = require('../../../vehicles/vehicleManager');

class Vehicle extends Command {
  constructor (...args) {
    super(...args, {
      name: 'avehicle name',
      aliases: ['aveh name', 'av name'],
      args: ['ID pojazdu z gry', 'Nowa nazwa pojazdu']
    });
  }

  async run (player, command, args) {
    const [vehicleId, name] = args;

    const vehicle = mp.vehicles.at(vehicleId);
    if (vehicle) {
      vehicle.informations.name = name;
      await updateName(vehicle.informations.id, name);

      player.call('actionDone', [
        'Komendy administracyjne',
        'Nazwa pojazdu (ID: ' + vehicle.informations.id + ') została zaktualizowana. Nowa nazwa: ' + vehicle.informations.name + '.'
      ]);
    } else {
      return player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${command.name} ${this.tooltip}`]);
    }
  }
}

module.exports = Vehicle;
