'use strict';

mp.events.add({
  playerEnterVehicle: (vehicle, seat) => {
    const engineStatus = vehicle.engine ? true : false;

    vehicle.setEngineOn(engineStatus, false, true);
    vehicle.setUndriveable(engineStatus);
  },

  entityStreamIn: vehicle => {
    if (vehicle.type !== 'vehicle') {
      return false;
    }

    if (typeof vehicle.getVariable('description') !== 'undefined') {
      const description = vehicle.getVariable('description');
      vehicle.description = description;
    }
  },

  entityDataChange: (vehicle, key, value) => {
    switch (key) {
      case 'description':
        vehicle.description = value;
        break;

      case 'policeRadar':
        vehicle.policeRadar = value;
        break;
    }
  },

  setDoorsLockedInSpecialVehicle: vehicle => {
    vehicle.setDoorsLocked(4);
    vehicle.setDoorsShut(true);
  },

  lowerVehicleRoof: vehicle => {
    let getVehicleRoofStatus = vehicle.getConvertibleRoofState();

    if (getVehicleRoofStatus === 0) {
      vehicle.lowerConvertibleRoof(false);
    }
  },

  raiseVehicleRoof: vehicle => {
    let getVehicleRoofStatus = vehicle.getConvertibleRoofState();

    if (getVehicleRoofStatus === 2) {
      vehicle.raiseConvertibleRoof(false);
    }
  }
});
