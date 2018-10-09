const Command = require('../../structures/command');
const { isVehicleDriver } = require('../../player/playerMisc');
const { setDescription } = require('../../vehicles/vehicleService');

class VehicleDescription extends Command {
  constructor (...args) {
    super(...args, {
      name: 'v opis',
      aliases: ['v desc'],
      args: ['Opis pojazdu - krótki, zwięzły']
    });
  }

  run (player, command, args) {
    const fullText = command.fullText;

    if (isVehicleDriver(player)) {
      if (fullText.length >= 80) {
        return player.call('actionDone', ['Coś poszło nie tak!', 'Maksymalna liczba znaków opisu pojazdu wynosi 80! Skoryguj opis i spróbuj ponownie.']);
      }

      setDescription(player.vehicle, fullText);
    } else {
      player.call('actionDone', ['Coś poszło nie tak!', 'Musisz być w pojeździe jako kierowca, aby móc ustawić opis pojazdu!']);
    }
  }
}

module.exports = VehicleDescription;
