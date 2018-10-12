const Command = require('../../../structures/command');
const { updateInterior } = require('../../../doors/doorManager');

class Interior extends Command {
  constructor (...args) {
    super(...args, {
      name: 'adoor interior',
      aliases: ['adrzwi interior', 'ad interior'],
      args: ['ID drzwi z gry', 'Nazwa interioru (IPL)']
    });
  }

  async run (player, command, args) {
    const [doorGameId, interiorIpl] = args;

    const door = mp.markers.at(doorGameId);
    if (door) {
      await updateInterior(door.informations.id, interiorIpl);
      door.informations.ipl = interiorIpl;

      player.call('actionDone', [
        'Komendy administracyjne',
        `Interior drzwi "${door.informations.name}" (ID: ${door.informations.id}) został zaktualizowany.`
      ]);
    } else {
      return player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${command.name} ${this.tooltip}`]);
    }
  }
}

module.exports = Interior;
