'use strict';

/**
 * Enter door as player.
 *
 * @param {object} player Player as object.
 */
const enterDoor = (player, door) => {
  if (door) {
    if (door.informations.doorInsidePosition && door.informations.doorInsideDimension && door.informations.type === 'enter') {
      player.door = door;
      player.dimension = door.informations.doorInsideDimension;
      player.position = door.informations.doorInsidePosition;
    }
  }
};

exports.enterDoor = enterDoor;

/**
 * Leave door as player.
 *
 * @param {object} player Player as object.
 */
const leaveDoor = (player, door) => {
  if (door) {
    if (door.informations.type === 'leave') {
      let door = player.door;

      player.dimension = door.informations.doorDimension;
      player.position = door.informations.doorPosition;

      // Clear info about door for player.
      clearCurrentDoorInfo(player);
    }
  }
};

exports.leaveDoor = leaveDoor;

/**
 * Clear last entering door info for player.
 *
 * @param {object} player Player as object.
 */
const clearDoorInfo = player => {
  player.lastEnteringDoor = null;
  player.inFrontOfDoors = false;
};

exports.clearDoorInfo = clearDoorInfo;

/**
 * Clear current door info.
 *
 * @param {object} player Player as object.
 */
const clearCurrentDoorInfo = player => {
  player.door = null;
};
