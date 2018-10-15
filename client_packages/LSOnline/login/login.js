'use strict';

const camera = require('./LSOnline/util/camera');
const globals = require('./LSOnline/util/globals');
const browser = require('./LSOnline/util/browser');
const Overlay = require('./LSOnline/util/overlay');
const peds = [];

function preparePanel (url) {
  browser.prepareScreen(1000);
  camera.createCamera(-1033.9517, -2731.807, 20.168, 0, 0, 150, 60);
  browser.open(url);
}

function changePanel (url) {
  browser.close();
  setTimeout(function () {
    browser.prepareScreen();
    browser.open(url);
  }, 1000);
}

function handleResponse (characters) {
  setTimeout(function () {
    browser.inject(`handleResponse(${characters})`);
  }, 1000);
}

function destroyPanel () {
  camera.destroyCamera();
  browser.close();
}

mp.events.add({
  loginPanelAppeared: url => {
    // preparePanel(url);

    // Only for test (debug) purposes. New login panel coming soon.
    mp.events.callRemote('authorizePlayer', 'Mati', 'XP#lSw0gbB1N');
  },
  loginButtonClicked: (login, password) => {
    mp.events.callRemote('authorizePlayer', login, password);
  },
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
    destroyPanel();
    mp.events.callRemote('loginPlayer', characterId);
  }
});
