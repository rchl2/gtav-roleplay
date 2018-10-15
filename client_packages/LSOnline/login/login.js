'use strict';

const browser = require('./LSOnline/api/browser');
const Overlay = require('./LSOnline/util/overlay');

/**
 * Pass response to the browser.
 */
const handleResponse = response => setTimeout(() => browser.inject(`handleResponse(${response})`), 1000);

/**
 * Events.
 */
mp.events.add({
  loginPanelAppeared: url => {
    // browser.open(url);

    // Only for test (debug) purposes. New login panel coming soon.
    mp.events.callRemote('authorizePlayer', 'Mati', 'XP#lSw0gbB1N');
  },

  loginButtonClicked: (login, password) => mp.events.callRemote('authorizePlayer', login, password),

  remindAccount: () => {
    Overlay.notify(
      'Nie posiadasz konta?',
      'Wejdź na lsonline.pl i załóż je już teraz',
      'info',
      5000
    );
  },
  handleAuthResponse: async response => {
    // Only for test (debug) purposes. New login panel coming soon.
    mp.events.callRemote('loginPlayer', 1);
    // handleResponse(response);
  },

  characterSelected: characterId => {
    browser.close();
    mp.events.callRemote('loginPlayer', characterId);
  }
});
