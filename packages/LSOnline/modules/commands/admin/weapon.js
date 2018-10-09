const Command = require('../../structures/command');

class Weapon extends Command {
  constructor (...args) {
    super(...args, {
      name: 'bron'
    });
  }

  run (player, command, args) {
    let [weapon, ammo] = args;
    const weaponHash = mp.joaat(weapon);
    if (!weapon) weapon = 'weapon_compactrifle';

    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
    player.call('actionDone', [
      'Komendy administracyjne',
      'Dałeś testową broń twojej postaci. Pamiętaj o tym, że nie jest to przedmiot i aby korzystać z tej komendy do testów.'
    ]);
  }
}

module.exports = Weapon;
