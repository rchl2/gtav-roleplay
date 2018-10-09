'use strict';

const logger = require('../utils/logger');
const database = require('../database/database');

exports.loadAndSpawnCharacter = async (player, characterId) => {
  const character = await database.character.findById(characterId).then(character => {
    return character.dataValues;
  });

  mp.events.call('spawnCharacter', player, character);
  logger('authorization', `Loaded and spawned character ${player.character.info.name} (ID: ${player.character.info.id} / Player: ${player.name} / SC: ${player.socialClub} / IP: ${player.ip})!`, 'info');
};

exports.findCharactersForAccount = async (accountId) => {
  database.character.findAll({
    where: {owner: accountId}
  }).then(characters => {
    return characters;
  });
};

exports.saveCharacterBeforeQuit = async (characterId, dimension, position, lastVehicle = false, lastLogin, exitType) => {
  database.character.findById(characterId).then(character => {
    character
      .update({
        position: JSON.stringify(position),
        dimension: dimension,
        lastLogin: lastLogin,
        lastExitType: exitType
      })
      .then((character) => {
        logger('character', `Saved character "${character.name}" (ID: ${character.id} / Owner: ${character.owner}) data before quit.`, 'info');
      })
      .catch((err) => {
        logger('character', `Error occurred when saving character "${character.name}" (ID: ${character.id} / Owner: ${character.owner}) data before quit. (Message: ${err})`, 'error');
      });
  });

  if (lastVehicle) {
    database.character.findById(characterId).then(character => {
      character
        .update({lastVehicle: JSON.stringify(lastVehicle)})
        .then((character) => {
          logger('character', `Character "${character.name}" (ID: ${character.id} / Owner: ${character.owner}) was in vehicle so i saved his last vehicle too.`, 'info');
        })
        .catch((err) => {
          logger('character', `Error occurred when saving character "${character.name}" (ID: ${character.id} / Owner: ${character.owner}) info about last vehicle. (Message: ${err})`, 'error');
        });
    });
  }
};

exports.clearLastVehicleInfo = async (characterId) => {
  database.character.findById(characterId).then(character => {
    character
      .update({lastVehicle: null});
  });
};
