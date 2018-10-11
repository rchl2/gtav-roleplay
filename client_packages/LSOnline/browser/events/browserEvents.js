'use strict';

const Overlay = require('./LSOnline/util/overlay');

mp.events.add({
  browserCreated: browser => {
    console.log(`Browser ${browser} has been created ingame.`);
  },

  browserLoadingFailed: browser => {
    Overlay.notify(
      'Wystąpił błąd',
      `Przeglądarka ${browser} nie załadowała się poprawnie. Spróbuj ponownie.`,
      'info',
      5000
    );
  }
});
