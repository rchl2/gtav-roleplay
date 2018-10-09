'use strict';

var instance;

/**
 * Class to handle an Overlay browser.
 * It meant to be singleton. (dunno if good solution)
 * @class Notification
 */
class Overlay {
  /**
   * Create an overlay
   * @param {string} url - Path to file
   * @memberof Overlay
   */
  constructor () {
    if (instance) {
      return instance;
    }
    instance = this;
    this.browser = mp.browsers.new(
      'package://LSOnline/browser/dist/overlay/index.html'
    );
  }

  /**
   *
   *
   * @param {string} title
   * @param {string} content
   * @param {('info')} [type="info"]
   * @param {3500} [timeout=3500]
   * @memberof Overlay
   */
  notify (title, content, type = 'info', timeout = 3500) {
    mp.game.audio.playSoundFrontend(
      -1,
      'CHALLENGE_UNLOCKED',
      'HUD_AWARDS',
      true
    );
    this.browser.execute(
      `showNotification("${title}", "${content}", "${type}", ${timeout});`
    );
  }
}

exports = new Overlay();
