let timer = false;
const player = mp.players.local;

const positions = {
  MONEY_HUD: [0.95, 0.005],
  MONEY_HUD_DIFF: [0.95, 0.04]
};

exports = class DrawText {
  /**
   * Adds a drawText at screen or world for local player
   * @static
   * @param {string} key Unique name
   * @param {string} text Text to display
   * @param {array} [position=[0, 0]] Position at screen
   * @param {object} [options={}] Data object
   * @param {integer} options.font Font Id
   * @param {array} options.color Color of the text plus alpha
   * @param {array} options.scale ([x, y]): scale of the text (1.0 is a good value)
   * @param {boolean} options.outline Text has borders or not
   * @param {boolean} options.centre Text is centered or not
   * @param {boolean} [timeout=false] Time before fade away
   */
  static drawText (key, text, position = [0, 0], options = {}, timeout = false) {
    this.destroyText(key);
    position = positions[position] || position;
    player.textDraws[key] = {
      name: text,
      position,
      options
    };

    if (timeout) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.destroyText(key);
      }, timeout);
    }
    return player.textDraws[key];
  }

  /**
   * Removes a drawText by key
   * @static
   * @param {string} key
   * @returns
   */
  static destroyText (key) {
    if (player.textDraws[key]) {
      delete player.textDraws[key];
      return true;
    };
    return false;
  }
};
