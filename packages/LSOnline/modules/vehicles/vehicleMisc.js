'use strict';

const vehicleData = require('../vehicles/vehicleData');

const checkIfVehicleModelExists = (model) => {
  if (model in vehicleData.vehicleHashes) {
    return true;
  }

  return false;
};

exports.checkIfVehicleModelExists = checkIfVehicleModelExists;

// Temporary cuz getting vehicleClass on client-side or using native not working.
const checkIfVehicleModelIsPolice = (model) => {
  if (model in vehicleData.policeVehicleHashes) {
    return true;
  }

  return false;
};

exports.checkIfVehicleModelIsPolice = checkIfVehicleModelIsPolice;

const checkIfVehicleIsConvertible = (model) => {
  if (model in vehicleData.vehiclesThatHaveRoofHashes) {
    return true;
  }

  return false;
};

exports.checkIfVehicleIsConvertible = checkIfVehicleIsConvertible;

const checkIfVehicleModelIsBike = (model) => {
  if (model in vehicleData.bikesHashes) {
    return true;
  }

  return false;
};

exports.checkIfVehicleModelIsBike = checkIfVehicleModelIsBike;
