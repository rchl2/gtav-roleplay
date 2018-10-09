const Command = require('../../../structures/command');
const { unspawn } = require('../../../vehicles/vehicleManager');

class Unspawn extends Command {
  constructor (...args) {
    super(...args, {
      name: 'avehicle unspawn',
      aliases: ['aveh unspawn', 'av unspawn'],
      args: ['ID pojazdu z gry']
    });
  }

  async run (player, command, args) {
    const vehicleId = args[0];
    const vehicle = mp.vehicles.at(vehicleId);

    if (vehicle) {
      await unspawn(vehicle);

      player.call('actionDone', [
        'Komendy administracyjne',
        'Pojazd ' + vehicle.informations.name + ' (ID: ' + vehicle.informations.id + ') został pomyślnie <strong>odspawnowany</strong>!'
      ]);
    } else {
      return player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${command.name} ${this.tooltip}`]);
    }
  }
}

module.exports = Unspawn;
