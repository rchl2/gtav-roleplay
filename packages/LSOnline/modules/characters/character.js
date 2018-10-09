const moment = require('moment');
const { saveCharacterBeforeQuit, clearLastVehicleInfo } = require('../characters/characterManager');

class Character {
  constructor (data) {
    this.info = data;
  }

  async saveBeforeQuit (player, lastVehicle = false, exitType) {
    lastVehicle
      ? await saveCharacterBeforeQuit(this.info.id, player.dimension, player.position, lastVehicle, this.info.lastLogin, exitType)
      : await saveCharacterBeforeQuit(this.info.id, player.dimension, player.position, undefined, this.info.lastLogin, exitType);
  }

  updateLastLoginDate () {
    this.info.lastLogin = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  async clearLastVehicleInfo () {
    this.info.lastVehicle = null;
    await clearLastVehicleInfo(this.info.id);
  }
};

module.exports = Character;
