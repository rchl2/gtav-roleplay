'use strict';

const browser = require('./LSOnline/api/browser');
const Overlay = require('./LSOnline/util/overlay');

/**
 * Show characters inside browser.
 */
const showCharacters = characters => setTimeout(() => browser.inject(`showCharacters('${characters}', 3000)`), 4000);

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

  userAuthorized: characters => {
    browser.close();

    // Only for test (debug) purposes. New login panel coming soon.
    mp.events.callRemote('loginPlayer', 1);
    // browser.changePage('package://LSOnline/browser/dist/characterSelect/index.html');

    // showCharacters(characters);
  },

  characterSelected: characterId => {
    browser.close();
    mp.events.callRemote('loginPlayer', characterId);
  }
});
