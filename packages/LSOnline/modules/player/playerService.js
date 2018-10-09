'use strict';

const brutallyWoundedTime = 20000;
const { getDeathReason } = require('../player/playerData');

const setBrutallyWounded = (player, reason, killer) => {
  if (player.brutallyWoundedTimer) {
    clearBrutallyWoundedTimers(player);
  }

  player.removeAllWeapons();
  player.brutallyWounded = true;
  player.brutallyWoundedTimer = setTimeout(reviveFromBrutallyWounded, brutallyWoundedTime, player);

  setDescription(player, getDeathReason(reason));
  rp.commands.get('me').run(player, {fullText: `traci przytomność.`});
};

exports.setBrutallyWounded = setBrutallyWounded;

const reviveFromBrutallyWounded = (player, fromMedic = false) => {
  clearBrutallyWoundedTimers(player);
  clearDescription(player);

  spawnPlayer(player);
  fromMedic ? setHealth(player, 30) : setHealth(player, 20);
};

exports.reviveFromBrutallyWounded = reviveFromBrutallyWounded;

const clearBrutallyWoundedTimers = (player) => {
  player.brutallyWounded = false;
  clearTimeout(player.brutallyWoundedTimer);
  player.brutallyWoundedTimer = null;
};

exports.clearBrutallyWoundedTimers = clearBrutallyWoundedTimers;

const setHealth = (player, health) => {
  player.health = health;
};

exports.setHealth = setHealth;

const killPlayer = (player) => {
  player.health = 0;
};

exports.killPlayer = killPlayer;

const spawnPlayer = (player) => {
  player.spawn(player.position);
};

exports.spawnPlayer = spawnPlayer;

const setDescription = (player, text) => {
  player.outputChatBox(`!{#dddddd} Ustawiono nowy opis: ${text}`);
  player.setVariable('description', text);
};

exports.setDescription = setDescription;

const clearDescription = (player) => {
  player.outputChatBox(`!{#dddddd} Opis postaci został pomyślnie usunięty.`);
  player.setVariable('description', null);
};

exports.clearDescription = clearDescription;

const prepareBeforeQuit = (player, exitType) => {
  clearBrutallyWoundedTimers(player);

  if (player.vehicle) {
    const vehicle = { id: player.vehicle.informations.id, seat: player.seat };
    player.character.saveBeforeQuit(player, vehicle, exitType);
  } else {
    player.character.saveBeforeQuit(player, undefined, exitType);
  }
};

exports.prepareBeforeQuit = prepareBeforeQuit;

const createQuitLabel = (player, exitType) => {
  if (!player.quitLabel) {
    player.quitLabel = mp.labels.new(`~HUD_COLOUR_GREYLIGHT~ (( ${player.name} - ${exitType} ))`, new mp.Vector3(player.position.x, player.position.y, player.position.z),
      {
        los: true,
        font: 0,
        drawDistance: 10,
        dimension: player.dimension
      });
  }

  // This need to be rewrited when we gonna create labels manager.
  setTimeout(() => {
    if (player.quitLabel) {
      player.quitLabel.destroy();
    }
  }, 40000);
};

exports.createQuitLabel = createQuitLabel;

const pushHelpMessage = (player, message) => {
  player.call('showHelpMessage', [message]);
};

exports.pushHelpMessage = pushHelpMessage;

const stopPlayingAnimation = player => {
  if (player.isPlayingAnimation) {
    if (!player.brutallyWounded) {
      player.stopAnimation();
      player.isPlayingAnimation = false;

      pushHelpMessage(player, `Przerwano działanie animacji.`);
    }
  }
};

exports.stopPlayingAnimation = stopPlayingAnimation;
