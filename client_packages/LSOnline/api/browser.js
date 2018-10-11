'use strict';

let browser;
let browserPageSwitchTimer;

/**
 * Open URL in browser.
 */
const open = (url) => {
  if (browser) {
    close();
  }

  prepareScreenForBrowser();
  browser = mp.browsers.new(url);
};

exports.open = open;

/**
 * Destroys browser.
 */
const close = () => {
  if (browser) {
    browser.destroy();
    browser = null;
  }

  mp.gui.cursor.visible = false;
  mp.game.ui.displayRadar(true);
  mp.gui.chat.show(true);
};

exports.close = close;

/**
 * Prepare client screen for browser.
 * Enables GUI cursor inside CEF, disables radar and hides chat.
 */
const prepareScreenForBrowser = () => {
  mp.gui.cursor.visible = true;
  mp.game.ui.displayRadar(false);
  mp.gui.chat.show(false);
};

/**
 * Inject code inside browser.
 */
const inject = code => {
  browser ? browser.execute(code) : console.log(`There was a problem with injecting code inside ${browser}.`);
};

exports.inject = inject;

/**
 * Change browser in page.
 * As in rage - we need to create new browser instance to do this.
 */
const changePage = url => {
  close();

  if (browserPageSwitchTimer) {
    clearTimeout(browserPageSwitchTimer);
  }

  browserPageSwitchTimer = setTimeout(() => open(url), 500);
};

exports.changePage = changePage;
