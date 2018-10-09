const Command = require('../../../structures/Command');
const { assign } = require('../../../vehicles/vehicleManager');

class Assign extends Command {
  constructor (...args) {
    super(...args, {
      name: 'avehicle przypisz',
      aliases: ['aveh przypisz', 'av przypisz'],
      perms: true,
      args: ['ID pojazdu z gry', 'Typ właściciela', 'ID właściciela']
    });
  }

  run (player, command, args) {
    const [ vehicleId, ownerType, ownerId ] = args;
    const vehicle = mp.vehicles.at(vehicleId);

    if (vehicle) {
      if (ownerType > 2) {
        return player.call('actionDone', [
          'Wystąpił błąd!',
          `Typ właściciela jest niepoprawny!`
        ]);
      }

      if (ownerType == 1) {
        this.assignToPlayer(player, ownerId, vehicle);
      } else {
        return player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${command.name} ${this.tooltip}`]);
      }
    } else {
      return player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${command.name} ${this.tooltip}`]);
    }
  }

  async assignToPlayer (player, ownerId, vehicle) {
    let owner = mp.players.at(ownerId);

    if (owner) {
      owner = { id: owner.character.info.id, name: owner.character.info.name };
      await assign(vehicle.informations.id, 1, owner);

      player.call('actionDone', [
        'Komendy administracyjne',
        `Pojazd ${vehicle.informations.name} (UID: ${vehicle.informations.id}) został pomyślnie przypisany do gracza ${owner.name} (UID: ${owner.id}).`
      ]);
    } else {
      return player.call('actionDone', ['Coś poszło nie tak!', 'Taki gracz nie istnieje.']);
    }
  }

  assignToGroup (group, vehicle) {}
}

module.exports = Assign;
