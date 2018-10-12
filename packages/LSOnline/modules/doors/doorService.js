'use strict';

const playerService = require('../player/playerService');
const { checkCharacterCash } = require('../characters/characterService');

/**
 * Enter door as player.
 *
 * @param {object} player Player as object.
 * @param {object} door Door as object.
 */
const enterDoor = (player, door) => {
  if (door) {
    if (door.informations.doorInsidePosition && door.informations.doorInsideDimension && door.informations.type === 'enter') {
      if (!checkCharacterCash(player, door.informations.doorEnterPrice)) {
        return playerService.pushHelpMessage(player, `Aby wejść do tego budynku musisz posiadać $${door.informations.enterPrice}!`);
      }

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
