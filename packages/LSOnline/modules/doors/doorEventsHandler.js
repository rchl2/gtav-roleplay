'use strict';

const { pushHelpMessage } = require('../player/playerService');
const { enterDoor, leaveDoor } = require('./doorService');

mp.events.add({
  playerEnterColshape: (player, shape) => {
    if (shape.informations.doorName) {
      let door = shape;

      // Assign data to player
      player.lastEnteringDoor = door;
      player.inFrontOfDoors = true;

      // Check type of door
      door.informations.type === 'enter'
        ? pushHelpMessage(player, `Aby wejść do drzwi "${shape.informations.doorName}" naciśnij ~b~E~w~.`)
        : pushHelpMessage(player, `Aby wyjść z drzwi "${shape.informations.doorName}" naciśnij ~b~E~w~.`);
    }
  },

  playerExitColshape: (player, shape) => {
    if (shape.informations.doorName) {
      player.lastEnteringDoor = null;
      player.inFrontOfDoors = false;
    }
  },

  keyE: player => {
    if (player.inFrontOfDoors) {
      if (player.lastEnteringDoor) {
        let door = player.lastEnteringDoor;
        door.informations.type === 'enter' ? enterDoor(player, door) : leaveDoor(player, door);
      }
    }
  }
});
