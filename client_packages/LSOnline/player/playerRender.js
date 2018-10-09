'use strict';

const player = mp.players.local;
const { vectorDistance, wordWrap } = require('./LSOnline/util/misc');

// Main render for players
mp.events.add('render', (nametags) => {
  mp.players.forEachInStreamRange(
    (player2) => {
      if (player2 !== player && vectorDistance(player.position, player2.position) < 15) {
        // Only for test purposes
        const playerName = `${player2.name} (${player2.remoteId})`;
        const playerStatus = `\n~HUD_COLOUR_GREYLIGHT~(umięśniony, pijany, naćpany)`;

        if (playerStatus) {
          mp.game.graphics.drawText(playerName + playerStatus, [player2.position.x, player2.position.y, player2.position.z + 1.2],
            {
              font: 0,
              color: [255, 255, 255, 255],
              scale: [0.3, 0.3],
              outline: true
            });
        } else {
          mp.game.graphics.drawText(playerName, [player2.position.x, player2.position.y, player2.position.z + 1],
            {
              font: 0,
              color: [255, 255, 255, 255],
              scale: [0.3, 0.3],
              outline: true
            });
        }
      }

      if (player2 !== player && player2.description != null && vectorDistance(player.position, player2.position) < 15) {
        mp.game.graphics.drawText(wordWrap(player2.description, 25), [player2.position.x, player2.position.y, player2.position.z + 0.2],
          {
            font: 0,
            color: [255, 255, 255, 200],
            scale: [0.3, 0.3],
            outline: true
          }
        );
      }
    });

  Object.keys(player.textDraws).forEach(key => {
    let text = player.textDraws[key];

    mp.game.graphics.drawText(text.name, text.position, text.options);
  });
});
