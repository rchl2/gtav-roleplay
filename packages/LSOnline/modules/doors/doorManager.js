'use strict';

const logger = require('../utils/logger');
const database = require('../database/database');

/**
 * Create door inside database with given name.
 * Proceed to spawn them on world.
 *
 * @param {object} player Player as object.
 * @param {string} name Name of the door.
 */
async function create (player, name) {
  database.door
    .create({
      name: name,
      owner: player.character.info.id,
      ownerType: 1,
      position: JSON.stringify(player.position),
      insidePosition: JSON.stringify(player.position),
      heading: player.heading,
      dimension: player.dimension,
      insideDimension: player.dimension + 1
    })
    .then(door => {
      logger('door', `Saved door "${door.name}" (ID: ${door.id}) in database.`, 'info');
      spawn(door);
    });
}

exports.create = create;

/**
 * Spawn door on world as marker.
 *
 * @param {object} door Door as object from database.
 */
function spawn (door) {
  if (door.position === null) {
    return logger('door', `Position of door "${door.name}" is null, proceeding to destroy this doors.`, 'error');
  }

  let doorPosition = JSON.parse(door.position);
  const createdDoor = mp.markers.new(1, new mp.Vector3(doorPosition.x, doorPosition.y, doorPosition.z - 1), 1,
    {
      visible: true,
      dimension: door.dimension
    });

  configureCreated(createdDoor, door.dataValues);
}

/**
 * Configure newly spawned on world door.
 *
 * @param {object} createdDoor Marker as a door ingame, given as object.
 * @param {object} doorData Door as object from database.
 */
function configureCreated (createdDoor, doorData) {
  try {
    const doorPosition = JSON.parse(doorData.position);
    const doorInsidePosition = JSON.parse(doorData.insidePosition);

    // Configure marker
    createdDoor.scale = 0.8;
    createdDoor.setColor(51, 204, 255, 155);

    // Assign data to marker
    createdDoor.informations = {
      id: doorData.id,
      gameId: createdDoor.id,
      name: doorData.name,
      position: doorPosition,
      insidePosition: doorInsidePosition,
      dimension: doorData.dimension,
      insideDimension: doorData.insideDimension
    };

    // Create colshapes for door
    createEnterColshape(createdDoor, doorData);
    createExitColshape(createdDoor, doorData);
  } catch (e) {
    logger('door', `Error occurred when configuring door "${doorData.name}" (ID: ${doorData.id}). (Message: ${e})`, 'error');
  }
}

/**
 * Create enter colshape for door.
 *
 * @param {object} createdDoor Marker as a door ingame, given as object.
 * @param {object} doorData Door as object from database.
 */
function createEnterColshape (createdDoor, doorData) {
  const doorPosition = JSON.parse(doorData.position);
  const doorInsidePosition = JSON.parse(doorData.insidePosition);
  const enterColshape = mp.colshapes.newSphere(doorPosition.x, doorPosition.y, doorPosition.z, 0.8);

  // Configure colshape, assign data
  enterColshape.dimension = doorData.dimension;
  enterColshape.informations = {
    id: enterColshape.id,
    type: 'enter',
    doorGameId: createdDoor.id,
    doorId: doorData.id,
    doorName: doorData.name,
    doorDimension: doorData.dimension,
    doorInsideDimension: doorData.insideDimension,
    doorPosition: doorPosition,
    doorInsidePosition: doorInsidePosition
  };
}

/**
 * Create exit colshape for door.
 *
 * @param {object} createdDoor Marker as a door ingame, given as object.
 * @param {object} doorData Door as object from database.
 */
function createExitColshape (createdDoor, doorData) {
  const doorPosition = JSON.parse(doorData.position);
  const doorInsidePosition = JSON.parse(doorData.insidePosition);
  const exitColshape = mp.colshapes.newSphere(doorInsidePosition.x, doorInsidePosition.y, doorInsidePosition.z, 0.8);

  // Configure colshape, assign data
  exitColshape.dimension = doorData.insideDimension;
  exitColshape.informations = {
    id: exitColshape.id,
    type: 'leave',
    doorGameId: createdDoor.id,
    doorId: doorData.id,
    doorName: doorData.name,
    doorDimension: doorData.dimension,
    doorInsideDimension: doorData.insideDimension,
    doorPosition: doorPosition,
    doorInsidePosition: doorInsidePosition
  };
}

/**
 * Load all doors and spawn them on world.
 */
const loadAll = async () => {
  database.door.findAll().then(doors => {
    for (let i = 0; i < doors.length; i++) {
      spawn(doors[i]);
    }
  });
};

exports.loadAll = loadAll;
