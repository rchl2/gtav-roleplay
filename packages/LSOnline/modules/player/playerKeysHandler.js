'use strict';

const { stopPlayingAnimation } = require('../player/playerService');

mp.events.add({
  keyShiftButton: player => stopPlayingAnimation(player)
});
