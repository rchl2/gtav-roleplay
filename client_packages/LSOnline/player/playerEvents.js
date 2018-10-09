'use strict';

const Cash = require('./LSOnline/cash/cash');
const { sendHelpMessage } = require('./LSOnline/util/misc');

mp.events.add({
  entityStreamIn: player => {
    if (player.type !== 'player') {
      return false;
    }

    if (typeof player.getVariable('description') !== 'undefined') {
      const description = player.getVariable('description');
      player.description = description;
    }
  },

  entityDataChange: (player, key, value) => {
    if (player.type !== 'player') {
      return false;
    }

    switch (key) {
      case 'description':
        player.description = value;
        break;

      case 'money':
        Cash.drawMoney(player, value);
        player.cash = value;
        break;
    }
  },

  playerDeath: (player, reason, killer) => {
    mp.game.audio.playSoundFrontend(-1, 'Bed', 'WastedSounds', true);
    mp.game.graphics.startScreenEffect('DeathFailNeutralIn', 0, true);
    mp.game.gameplay.setFadeOutAfterDeath(false);
  },

  playerSpawn: () => mp.game.graphics.stopScreenEffect('DeathFailNeutralIn'),
  setInvincible: (player, value) => value ? mp.players.local.setInvincible(true) : mp.players.local.setInvincible(false),
  showHelpMessage: (value) => sendHelpMessage(value)
});
