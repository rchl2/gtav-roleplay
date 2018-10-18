const moment = require('moment');
const { saveCharacterBeforeQuit, clearLastVehicleInfo } = require('../characters/characterManager');

class Character {
  constructor (data) {
    this.info = data;
  }

  async saveBeforeQuit (player, lastVehicle = null, exitType) {
    const played = this.getOnlineTime();
    await saveCharacterBeforeQuit(this.info.id, player.dimension, { position: player.position, heading: player.heading }, lastVehicle, this.info.lastLogin, exitType, player.health, played, player.money, player.bank);
  }

  updateLastLoginDate () {
    this.info.lastLogin = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  async clearLastVehicleInfo () {
    this.info.lastVehicle = null;
    await clearLastVehicleInfo(this.info.id);
  }

  getOnlineTime () {
    let joined = moment(this.joinedAt);
    let played = this.info.played + moment.duration(moment().diff(joined)).asMilliseconds();

    return played;
  }
};

module.exports = Character;
