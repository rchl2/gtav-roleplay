'use strict';

const { pushHelpMessage } = require('../player/playerService');
const { enterDoor, leaveDoor } = require('./doorService');

mp.events.add({
  playerEnterColshape: (player, shape) => {
    let door = shape;

    // Assign data to player
    player.door = shape;
    player.inFrontOfDoors = true;

    // Check type of door
    door.informations.type === 'enter'
      ? pushHelpMessage(player, `Aby wejść do drzwi "${shape.informations.doorName}" naciśnij ~b~E~w~.`)
      : pushHelpMessage(player, `Aby wyjść z drzwi "${shape.informations.doorName}" naciśnij ~b~E~w~.`);
  },

  playerExitColshape: (player, shape) => {
    player.door = null;
    player.inFrontOfDoors = false;
  },

  keyE: player => {
    if (player.door) {
      if (player.inFrontOfDoors) {
        let door = player.door;

        door.informations.type === 'enter'
          ? enterDoor(player)
          : leaveDoor(player);
      }
    }
  }
});
