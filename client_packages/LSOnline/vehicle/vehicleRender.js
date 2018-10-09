'use strict';

const player = mp.players.local;
const misc = require('./LSOnline/util/misc');

// Main render for vehicles
mp.events.add('render', () => {
  const vehicle = mp.players.local.vehicle;

  mp.vehicles.forEachInStreamRange(
    (vehicle) => {
      if (vehicle.description != null && misc.vectorDistance(player.position, vehicle.position) < 8) {
        mp.game.graphics.drawText(misc.wordWrap(vehicle.description, 40), [vehicle.position.x, vehicle.position.y, vehicle.position.z + 0.2],
          {
            font: 0,
            color: [255, 255, 255, 200],
            scale: [0.3, 0.3],
            outline: true
          }
        );
      }
    });

  if (vehicle) {
    if (vehicle.policeRadar) {
      const vehicleInFrontOf = misc.drawRaycastForPoliceRadar(vehicle);

      if (vehicleInFrontOf) {
        if (vehicleInFrontOf.entity.isAVehicle() && vehicleInFrontOf.entity !== vehicle) {
          const vehicleInFrontOfModel = mp.game.vehicle.getDisplayNameFromVehicleModel(vehicleInFrontOf.entity.model);
          const vehicleInFrontOfPlate = vehicleInFrontOf.entity.getNumberPlateText();
          const vehicleInFrontOfSpeed = vehicleInFrontOf.entity.getSpeed() * 2.236936;

          // Only for test purposes.
          mp.gui.chat.push(`Model: ${vehicleInFrontOfModel} Tablica: ${vehicleInFrontOfPlate} Prędkość: ${vehicleInFrontOfSpeed} km/h`);
        }
      }
    }
  }
});
