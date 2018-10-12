'use strict';

const randomSpawns = [
  new mp.Vector3(-247.76, 6331.23, 32.43)
];

const { getVehicleById } = require('../vehicles/vehicleService');

const spawnCharacterOnPosition = (player, character) => {
  let randomSpawn = randomSpawns[Math.floor(Math.random() * randomSpawns.length)];

  if (character.position) {
    const charPosition = JSON.parse(character.position);
    player.position = new mp.Vector3(charPosition.x, charPosition.y, charPosition.z);
  } else {
    player.position = randomSpawn;
  }

  player.heading = 90;
  player.dimension = character.dimension;

  if (character.lastVehicle) {
    putCharacterIntoLastVehicle(player, character);
    player.character.clearLastVehicleInfo();
  }
};

exports.spawnCharacterOnPosition = spawnCharacterOnPosition;

const putCharacterIntoLastVehicle = (player, character) => {
  const vehicle = JSON.parse(character.lastVehicle);
  let foundVehicle = getVehicleById(vehicle.id);

  if (foundVehicle) {
    if (player.distSquared(player.position) <= 100) {
      if (vehicle.seat === -1) {
        if (foundVehicle.locked) {
          return;
        }
      }

      player.putIntoVehicle(foundVehicle, vehicle.seat);
      player.call('actionDone', ['Informacja', 'Wróciłeś do pojazdu po ostatnim wyjściu z gry!']);
    }
  }
};

/**
 * Check character cash.
 *
 * @param {object} player Player as object.
 * @param {integer} cash Amount of cash to check.
 */
const checkCharacterCash = (player, cash) => {
  return (player.money < cash) ? false : true;
};

exports.checkCharacterCash = checkCharacterCash;
