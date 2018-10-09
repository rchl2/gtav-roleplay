const Character = require('../characters/character');
const { spawnCharacterOnPosition } = require('../characters/characterService');

mp.events.add({
  spawnCharacter: (player, character) => {
    player.character = new Character(character);
    player.character.updateLastLoginDate();

    player.name = character.name;
    player.data.money = character.money;

    spawnCharacterOnPosition(player, character);
  }
});
