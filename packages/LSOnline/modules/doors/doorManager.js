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
      enterPrice: 0,
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
    createdDoor.scale = rp.config.doors.markerScale;
    createdDoor.setColor(51, 204, 255, 155);

    // Assign data to marker
    createdDoor.informations = {
      id: doorData.id,
      gameId: createdDoor.id,
      name: doorData.name,
      ipl: null,
      enterPrice: 0,
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
    doorIpl: doorData.ipl,
    doorEnterPrice: doorData.enterPrice,
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
    doorIpl: doorData.ipl,
    doorEnterPrice: doorData.enterPrice,
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

      if (doors[i].ipl) {
        mp.world.requestIpl(doors[i].ipl);
      }
    }
  });
};

exports.loadAll = loadAll;

/**
 * Update door interior.
 *
 * @param {integer} doorId Door ID in database.
 * @param {string} interior Interior name (look at IPL list).
 */
async function updateInterior (doorId, interior) {
  database.door.findById(doorId).then(door => {
    door
      .update({ipl: interior})
      .then((door) => {
        logger('door', `Changed door "${door.name}" (ID: ${door.id}) interior to "${door.ipl}".`, 'info');
      })
      .catch((err) => {
        logger('door', `Error occurred when changing door "${door.name}" interior (ID: ${door.id}). (Message: ${err})`, 'error');
      });
  });
}

exports.updateInterior = updateInterior;

/**
 * Update door enter price.
 *
 * @param {integer} doorId Door ID in database.
 * @param {integer} enterPrice Enter price.
 */
async function updateEnterPrice (doorId, enterPrice) {
  database.door.findById(doorId).then(door => {
    door
      .update({enterPrice: enterPrice})
      .then((door) => {
        logger('door', `Changed door "${door.name}" (ID: ${door.id}) enter price to $"${door.enterPrice}".`, 'info');
      })
      .catch((err) => {
        logger('door', `Error occurred when changing door "${door.name}" enter price (ID: ${door.id}). (Message: ${err})`, 'error');
      });
  });
}

exports.updateEnterPrice = updateEnterPrice;

/**
 * Get closest door for player.
 *
 * @param {object} player Player as object.
 * @param {integer} range Range.
 */
function getClosestDoorForPlayer (player, range) {
  let foundDoor = null;

  mp.colshapes.forEachInRange(player.position, range, player.dimension,
    (door) => {
      foundDoor = door;
    }
  );

  return foundDoor;
}

exports.getClosestDoorForPlayer = getClosestDoorForPlayer;
