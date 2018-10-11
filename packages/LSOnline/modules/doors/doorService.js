'use strict';

/**
 * Enter door as player.
 *
 * @param {object} player Player as object.
 */
const enterDoor = player => {
  if (player.door) {
    let door = player.door;

    player.dimension = door.informations.doorInsideDimension;
    player.position = door.informations.doorInsidePosition;
  }
};

exports.enterDoor = enterDoor;

/**
 * Leave door as player.
 *
 * @param {object} player Player as object.
 */
const leaveDoor = player => {
  if (player.door) {
    let door = player.door;

    player.dimension = door.informations.doorDimension;
    player.position = door.informations.doorPosition;
  }
};

exports.leaveDoor = leaveDoor;

/**
 * Clear door info for player.
 *
 * @param {object} player Player as object.
 */
const clearDoorInfo = player => {
  player.door = null;
  player.inFrontOfDoors = false;
};

exports.clearDoorInfo = clearDoorInfo;
