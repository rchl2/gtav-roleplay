const DrawText = require('./LSOnline/util/drawText');
const font = 4;

exports = class {
  static drawMoney (player, value) {
    if (isNaN(value)) throw new Error('drawMoney: value need to be int');
    if (value <= 0) throw new Error('drawMoney: tried to set value less than 0');
    DrawText.drawText('cashHUD', `$${value}`, 'MONEY_HUD', {
      font,
      color: [133, 187, 101, 185],
      scale: [0.75, 0.75],
      outline: true,
      centre: true
    });
    if (value !== player.cash && player.cash) {
      let diff = 0;
      value > player.cash ? diff = `+ $${value - player.cash}` : diff = `- $${player.cash - value}`;
      DrawText.drawText('cashHUDDiff', diff, 'MONEY_HUD_DIFF', {
        font,
        color: value > player.cash ? [133, 187, 101, 185] : [240, 76, 79, 185],
        scale: [0.75, 0.75],
        outline: true,
        centre: true

      }, 3000);
    }
  }
};
