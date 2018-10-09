const Command = require('../../structures/Command');

class Clothes extends Command {
  constructor (...args) {
    super(...args, {
      name: 'c',
      aliases: ['clothes', 'ciuchy'],
      perms: true,
      args: ['Component ID', 'Drawable ID', 'Texture ID', 'Palette ID']
    });
  }

  run (player, command, args) {
    const [ componentId, drawableId, textureId, paletteId ] = args;
    player.setClothes(parseInt(componentId), parseInt(drawableId), parseInt(textureId), parseInt(paletteId));
  }
}

module.exports = Clothes;
