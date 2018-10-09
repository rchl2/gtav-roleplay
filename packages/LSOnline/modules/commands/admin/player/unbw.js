const Command = require('../../../structures/command');
const { reviveFromBrutallyWounded } = require('../../../player/playerService');

class Unbw extends Command {
  constructor (...args) {
    super(...args, {
      name: 'unbw',
      args: ['ID gracza']
    });
  }

  run (player, command, args) {
    const playerId = args[0];
    const foundPlayer = this.searchPlayerByIdOrName(playerId);

    if (!foundPlayer) {
      return player.call('actionDone', ['Coś poszło nie tak!', 'Taki gracz nie istnieje.']);
    }

    if (!foundPlayer.brutallyWounded) {
      return player.call('actionDone', ['Coś poszło nie tak!', 'Ten gracz nie posiada BW.']);
    }

    reviveFromBrutallyWounded(foundPlayer, true);
  }
}

module.exports = Unbw;
