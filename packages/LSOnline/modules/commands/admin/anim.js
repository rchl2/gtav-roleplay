const Command = require('../../structures/Command');

class Anim extends Command {
  constructor (...args) {
    super(...args, {
      name: 'anim',
      aliases: ['a', 'animacja'],
      perms: true
    });
  }

  run (player, command, args) {
    player.isPlayingAnimation = true;
    player.playAnimation('amb@world_human_aa_coffee@base', 'base', 1, 1);
  }
}

module.exports = Anim;
