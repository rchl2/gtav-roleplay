const Command = require('../../../structures/command');
const { create } = require('../../../vehicles/vehicleManager');
const { checkIfVehicleModelExists } = require('../../../vehicles/vehicleMisc');

class Vehicle extends Command {
  constructor (...args) {
    super(...args, {
      name: 'av',
      aliases: ['avehicle', 'av create'],
      hasSubcommands: true,
      args: ['Model pojazdu']
    });
  }

  async run (player, command, args) {
    const modelName = args[0];
    const isVehicleModelExist = checkIfVehicleModelExists(modelName);

    isVehicleModelExist
      ? await create(player, modelName)
      : player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${command.name} ${this.tooltip}`]);
  }
}

module.exports = Vehicle;
