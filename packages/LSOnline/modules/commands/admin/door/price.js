const Command = require('../../../structures/command');
const { updateEnterPrice } = require('../../../doors/doorManager');

class Price extends Command {
  constructor (...args) {
    super(...args, {
      name: 'adoor price',
      aliases: ['adrzwi cena', 'ad price'],
      args: ['ID drzwi z gry', 'Cena za wejście']
    });
  }

  async run (player, command, args) {
    const [doorGameId, price] = args;
    const door = mp.markers.at(doorGameId);

    if (door) {
      await updateEnterPrice(door.informations.id, price);
      door.informations.enterPrice = price;
      door.enterColshape.informations.doorEnterPrice = price;

      player.call('actionDone', [
        'Komendy administracyjne',
        `Cena wejścia drzwi "${door.informations.name}" (ID: ${door.informations.id}) została pomyślnie zaktualizowana na ${door.informations.enterPrice}.`
      ]);
    } else {
      return player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${command.name} ${this.tooltip}`]);
    }
  }
}

module.exports = Price;
