'use strict';

const logger = require('../utils/logger');
const helpers = require('../utils/helpers');
const database = require('../database/database');
const vehicleData = require('../vehicles/vehicleData');

async function create (player, model) {
  const primaryColor = [helpers.randomInt(0, 255), helpers.randomInt(0, 255), helpers.randomInt(0, 255)];
  const secondaryColor = [helpers.randomInt(0, 255), helpers.randomInt(0, 255), helpers.randomInt(0, 255)];

  database.vehicle
    .create({
      name: model,
      model: model,
      fuelType: vehicleData.fuelTypes[0].type,
      fuelRatio: 1,
      tankCapacity: 40.0,
      primaryColor: JSON.stringify(primaryColor),
      secondaryColor: JSON.stringify(secondaryColor),
      dimension: player.dimension,
      position: JSON.stringify(player.position)
    })
    .then(vehicle => {
      logger('vehicle', `Saved vehicle "${vehicle.name}" (Model: ${vehicle.model}) in database.`, 'info');
      spawn(vehicle);
    });
}

exports.create = create;

function configureCreated (createdVehicle, vehicleData) {
  try {
    let vehiclePlate = `LS${vehicleData.id}`;
    let primaryColor = JSON.parse(vehicleData.primaryColor);
    let secondaryColor = JSON.parse(vehicleData.secondaryColor);

    createdVehicle.setColorRGB(primaryColor[0], primaryColor[1], primaryColor[2], secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    createdVehicle.numberPlate = vehiclePlate;
    createdVehicle.informations = {
      id: vehicleData.id,
      gameId: createdVehicle.id,
      name: vehicleData.name,
      model: vehicleData.model,
      fuel: vehicleData.fuel,
      fuelType: vehicleData.fuelType,
      fuelRatio: vehicleData.fuelRatio,
      tankCapacity: vehicleData.tankCapacity,
      dirtLevel: vehicleData.dirtLevel
    };
  } catch (e) {
    logger('vehicle', `Error occurred when configuring vehicle "${vehicleData.name}" (ID: ${vehicleData.id} / Model: ${vehicleData.model}). (Message: ${e})`, 'error');
  }
}

async function load (vehicleId) {
  database.vehicle.findById(vehicleId).then(vehicle => {
    spawn(vehicle);
  });
}

exports.load = load;

const loadAll = async () => {
  database.vehicle.findAll().then(vehicles => {
    for (let i = 0; i < vehicles.length; i++) {
      spawn(vehicles[i]);
    }
  });
};

exports.loadAll = loadAll;

async function spawn (vehicle) {
  if (vehicle.position === null) {
    return logger('vehicle', `Vehicle position is null (vehicleId: ${vehicle.id})!`, 'error');
  }

  let carPosition = JSON.parse(vehicle.position);
  const createdVehicle = mp.vehicles.new(mp.joaat(vehicle.model), new mp.Vector3(carPosition.x, carPosition.y, carPosition.z),
    {
      locked: true,
      engine: false,
      dimension: vehicle.dimension
    });

  // logger('vehicle', `Spawned vehicle "${vehicle.name}" (GameID: ${createdVehicle.id} / ID: ${vehicle.id} / Model: ${vehicle.model}) on world.`, 'info');
  configureCreated(createdVehicle, vehicle);
}

const respawnAll = async () => {
  mp.vehicles.forEach((vehicle) => vehicle.destroy());
  await loadAll();
};

exports.respawnAll = respawnAll;

async function unspawn (vehicle) {
  if (vehicle) vehicle.destroy();
}

exports.unspawn = unspawn;

async function refuel (vehicleId, fuel) {
  database.vehicle.findById(vehicleId).then(vehicle => {
    vehicle
      .update({fuel: database.Sequelize.literal(`fuel + ${fuel}`)})
      .then((vehicle) => {
        logger('vehicle', `Refueled vehicle "${vehicle.name}" (Model: ${vehicle.model} / ID: ${vehicle.id}).`, 'info');
      })
      .catch((err) => {
        logger('vehicle', `Error occurred when refueling vehicle "${vehicle.name}" (Model: ${vehicle.model} / ID: ${vehicle.id}). (Message: ${err})`, 'error');
      });
  });
}

exports.refuel = refuel;

async function updateName (vehicleId, name) {
  database.vehicle.findById(vehicleId).then(vehicle => {
    vehicle
      .update({name: name})
      .then((vehicle) => {
        logger('vehicle', `Changed vehicle "${vehicle.name}" name (Model: ${vehicle.model} / ID: ${vehicle.id}).`, 'info');
      })
      .catch((err) => {
        logger('vehicle', `Error occurred when changing vehicle "${vehicle.name}" name (Model: ${vehicle.model} / ID: ${vehicle.id}). (Message: ${err})`, 'error');
      });
  });
}

exports.updateName = updateName;

async function assign (vehicleId, ownerType, owner) {
  if (ownerType == 1) {
    database.vehicle.findById(vehicleId).then(vehicle => {
      vehicle
        .update({owner: owner.id, ownerType: 1})
        .then((vehicle) => {
          logger('vehicle', `Assigned vehicle "${vehicle.name}" (ID: ${vehicle.id}) to player ${owner.name} (ID: ${owner.id}).`, 'info');
        })
        .catch((err) => {
          logger('vehicle', `Error occurred when assigning vehicle "${vehicle.name}" (ID: ${vehicle.id}) to player ${owner.name} (ID: ${owner.id}). (Message: ${err})`, 'error');
        });
    });
  }
}

exports.assign = assign;

async function remove (vehicleId) {
  database.vehicle.findById(vehicleId).then(vehicle => {
    vehicle
      .destroy()
      .then(() => {
        logger('vehicle', `Removed vehicle "${vehicle.name}" (Model: ${vehicle.model} / ID: ${vehicle.id}) from database.`, 'info');
      })
      .catch((err) => {
        logger('vehicle', `Error occurred when removing vehicle "${vehicle.name}" (Model: ${vehicle.model} / ID: ${vehicle.id}). (Message: ${err})`, 'error');
      });
  });
}

exports.remove = remove;
