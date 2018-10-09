'use strict';

const { isVehicleDriver } = require('../player/playerMisc');
const { checkIfVehicleIsConvertible } = require('../vehicles/vehicleMisc');
const { getClosestVehicleForPlayer, toggleVehicleLock } = require('../vehicles/vehicleService');

mp.events.add({
  keyArrowDown: player => {
    if (isVehicleDriver(player)) {
      const isVehicleConvertible = checkIfVehicleIsConvertible(player.vehicle.informations.model);

      if (isVehicleConvertible) {
        player.call('lowerVehicleRoof', [player.vehicle]);
      }
    }
  },

  keyArrowUp: player => {
    if (isVehicleDriver(player)) {
      const isVehicleConvertible = checkIfVehicleIsConvertible(player.vehicle.informations.model);

      if (isVehicleConvertible) {
        player.call('raiseVehicleRoof', [player.vehicle]);
      }
    }
  },

  keyZ: player => {
    let vehicle = getClosestVehicleForPlayer(player, 2);

    if (vehicle) {
      toggleVehicleLock(vehicle, player);
    }
  },

  keyY: player => {
    if (isVehicleDriver(player)) {
      rp.commands.get('engine').run(player);
    }
  }
});
