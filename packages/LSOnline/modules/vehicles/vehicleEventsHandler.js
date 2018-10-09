'use strict';

const { pushHelpMessage } = require('../player/playerService');
const { checkIfVehicleIsConvertible, checkIfVehicleModelIsBike } = require('../vehicles/vehicleMisc');

mp.events.add({
  playerEnterVehicle: (player, vehicle, seat) => {
    const isBike = checkIfVehicleModelIsBike(vehicle.informations.model);
    const isVehicleConvertible = checkIfVehicleIsConvertible(vehicle.informations.model);

    if (seat === -1) {
      if (!isBike) {
        pushHelpMessage(player, `Wsiadłeś do pojazdu, aby odpalić silnik naciśnij ~h~~b~Y~w~.`);
      }

      if (isVehicleConvertible) {
        pushHelpMessage(player, `~INPUT_CELLPHONE_DOWN~ aby otworzyć dach lub ~INPUT_CELLPHONE_UP~ aby go zamknąć.`);
      }
    }
  }
});
