'use strict';

const updateInterval = 100; // milliseconds, lower value = more accurate, at the cost of performance
const globals = require('./LSOnline/util/globals');
const { toggleChat } = require('./LSOnline/chat/events');

mp.events.add('render', () => {
  if (globals.altTabbed) {
    if (mp.game.controls.isDisabledControlJustPressed(0, 25)) {
      setGameAltTabbed(false);
    }
  }
});

setInterval(() => {
  if (!globals.altTabbed) {
    if ((mp.keys.isDown(18) && mp.keys.isDown(9)) || mp.keys.isDown(91)) {
      setGameAltTabbed(true);
    }
  }
}, updateInterval);

// Set alt-tab status ingame
const setGameAltTabbed = (value) => {
  globals.altTabbed = value;

  toggleChat(!value);
  value
    ? mp.game.graphics.transitionToBlurred(1000)
    : mp.game.graphics.transitionFromBlurred(800);
};
