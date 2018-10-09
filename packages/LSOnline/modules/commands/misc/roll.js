const Command = require('../../structures/command');
const helpers = require('../../utils/helpers');

class Roll extends Command {
  constructor (...args) {
    super(...args, {
      name: 'roll',
      aliases: ['kostka']
    });
  }

  run (player, command, args) {
    mp.players.broadcastInRange(player.position, 25, player.dimension, `!{#dca2f4} ** ${player.name} rzuca kostką i wyrzuca oczko ${helpers.randomInt(1, 6)}.`);
  }
}

module.exports = Roll;
