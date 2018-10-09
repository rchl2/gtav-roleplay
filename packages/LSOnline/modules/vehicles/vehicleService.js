'use strict';

const { checkIfVehicleModelIsBike, checkIfVehicleModelIsPolice } = require('../vehicles/vehicleMisc');

function getClosestVehicleForPlayer (player, range) {
  let foundVehicle = null;

  mp.vehicles.forEachInRange(player.position, range, player.dimension,
    (vehicle) => {
      foundVehicle = vehicle;
    }
  );

  return foundVehicle;
}

exports.getClosestVehicleForPlayer = getClosestVehicleForPlayer;

function getVehicleById (vehicleId) {
  let foundVehicle = null;

  mp.vehicles.forEach(
    (vehicle) => {
      if (vehicle.informations.id === vehicleId) {
        foundVehicle = vehicle;
      }
    });

  return foundVehicle;
}

exports.getVehicleById = getVehicleById;

const setDescription = (vehicle, text) => {
  vehicle.setVariable('description', text);
};

exports.setDescription = setDescription;

const clearDescription = (vehicle) => {
  vehicle.setVariable('description', null);
};

exports.clearDescription = clearDescription;

const toggleVehicleEngine = (vehicle, player) => {
  const isBike = checkIfVehicleModelIsBike(vehicle.informations.model);

  if (!isBike) {
    const actionType = vehicle.engine ? 'gasi' : 'odpala';
    vehicle.engine ? vehicle.engine = false : vehicle.engine = true;

    rp.commands.get('me').run(player, {fullText: `${actionType} silnik pojazdu ${vehicle.informations.name}.`});
  }
};

exports.toggleVehicleEngine = toggleVehicleEngine;

function toggleVehicleLock (vehicle, player) {
  const actionType = vehicle.locked ? 'otwiera' : 'zamyka';

  if (vehicle.locked) {
    vehicle.locked = false;
  } else {
    const isVehiclePoliceModel = checkIfVehicleModelIsPolice(vehicle.informations.model);
    vehicle.locked = true;

    if (isVehiclePoliceModel) {
      player.call('setDoorsLockedInSpecialVehicle', [vehicle]);
    }
  }

  rp.commands.get('me').run(player, {fullText: `${actionType} drzwi pojazdu ${vehicle.informations.name}.`});
}

exports.toggleVehicleLock = toggleVehicleLock;

function togglePoliceRadar (vehicle, player) {
  const actionType = vehicle.data.policeRadar ? 'wyłącza' : 'włącza';
  const isVehiclePoliceModel = checkIfVehicleModelIsPolice(vehicle.informations.model);

  if (isVehiclePoliceModel) {
    vehicle.data.policeRadar
      ? vehicle.data.policeRadar = false
      : vehicle.data.policeRadar = true;

    rp.commands.get('me').run(player, {fullText: `${actionType} radar w pojeździe ${vehicle.informations.name}.`});
  }
}

exports.togglePoliceRadar = togglePoliceRadar;
