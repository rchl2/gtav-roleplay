"use strict";

let browser = null;

function prepareScreen (blurred = null) {
  mp.gui.cursor.visible = true;
  mp.game.ui.displayRadar(false);
  mp.gui.chat.show(false);
  if (blurred) {
    mp.game.graphics.transitionToBlurred(blurred);
  }
}
exports.prepareScreen = prepareScreen;

function open (url, lang = "eng") {
  if (browser) {
    browser.destroy();
  }
  browser = mp.browsers.new(url);
}
exports.open = open;

function inject (execute) {
  if (!browser) {
    return console.log(`injectCef = ${browser}`);
  }
  browser.execute(execute);
}
exports.inject = inject;

function close () {
  if (browser) {
    browser.destroy();
    browser = null;
  }
  mp.gui.cursor.visible = false;
  mp.game.ui.displayRadar(true);
  mp.gui.chat.show(true);
  mp.game.graphics.transitionFromBlurred(500);
}
exports.close = close;

mp.events.add(
  {
    "browserElementInjected": (execute) => {
      console.log(execute);
      inject(execute);
    },

    "browserClosed": () => {
      close();
    },

    "browserCreated": (createdBrowser) => {
      console.log(`browser ${createdBrowser} has been created`);
    }
  });
