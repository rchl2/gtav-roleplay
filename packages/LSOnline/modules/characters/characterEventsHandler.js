const Character = require('../characters/character');
const { spawnCharacterOnPosition } = require('../characters/characterService');

mp.events.add({
  spawnCharacter: (player, character) => {
    if (player.account.member_id !== character.owner) player.kick('Postać nie należy do gracza.');
    player.character = new Character(character);
    player.character.updateLastLoginDate();

    player.name = character.name;
    player.data.money = character.money;
    player.data.bank = character.bank;
    player.health = character.health;
    spawnCharacterOnPosition(player, character);
  }
});
