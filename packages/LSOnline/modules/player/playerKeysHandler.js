'use strict';

const { stopPlayingAnimation } = require('../player/playerService');

mp.events.add({
  shiftButtonKey: player => stopPlayingAnimation(player)
});
