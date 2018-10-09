'use strict';

const natives = {
  SET_TEXT_OUTLINE: '0x2513dfb0fb8400fe'
};

const prepareClientView = () => {
  // Disable vehicle rewards
  mp.game.player.disableVehicleRewards();

  // Disable nametags
  mp.nametags.enabled = false;

  // Hide HUD elements
  hideHudElements([1, 3]);

  // Update discord status
  mp.discord.update('LSRP:V', 'In-Game');

  // Initialize textDraws object
  mp.players.local.textDraws = {};
};

exports.prepareClientView = prepareClientView;

const hideHudElements = (array) => {
  for (let element of array) {
    mp.game.ui.hideHudComponentThisFrame(element);
  }
};

exports.hideHudElements = hideHudElements;

const disableControlActions = (array) => {
  for (let control of array) {
    mp.game.controls.disableControlAction(0, control, true);
  }
};

exports.disableControlActions = disableControlActions;

const draw3dText = (text, drawXY, font, color, scale, alignRight = false) => {
  mp.game.ui.setTextEntry('STRING');
  mp.game.ui.addTextComponentSubstringPlayerName(text);
  mp.game.ui.setTextFont(font);
  mp.game.ui.setTextScale(scale, scale);
  mp.game.ui.setTextColour(color[0], color[1], color[2], color[3]);
  mp.game.invoke(natives.SET_TEXT_OUTLINE);

  if (alignRight) {
    mp.game.ui.setTextRightJustify(true);
    mp.game.ui.setTextWrap(0, drawXY[0]);
  }

  mp.game.ui.drawText(drawXY[0], drawXY[1]);
};

exports.draw3dText = draw3dText;

// Credits: https://github.com/glitchdetector/fivem-minimap-anchor
const getMinimapAnchor = () => {
  let sfX = 1.0 / 20.0;
  let sfY = 1.0 / 20.0;
  let safeZone = mp.game.graphics.getSafeZoneSize();
  let aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
  let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
  let scaleX = 1.0 / resolution.x;
  let scaleY = 1.0 / resolution.y;

  let minimap = {
    width: scaleX * (resolution.x / (4 * aspectRatio)),
    height: scaleY * (resolution.y / 5.674),
    scaleX: scaleX,
    scaleY: scaleY,
    leftX: scaleX * (resolution.x * (sfX * (Math.abs(safeZone - 1.0) * 10))),
    bottomY: 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(safeZone - 1.0) * 10)))
  };

  minimap.rightX = minimap.leftX + minimap.width;
  minimap.topY = minimap.bottomY - minimap.height;
  return minimap;
};

exports.getMinimapAnchor = getMinimapAnchor;

// Credits to @ramiong - thanks man
const wordWrap = (text, charactersLimit) => {
  const regex = '.{1,' + charactersLimit + '}(\\s|$)' + '|\\S+?(\\s|$)';
  return text.match(RegExp(regex, 'g')).join('\n');
};

exports.wordWrap = wordWrap;

// Credits to YARP author
const vectorDistance = (vector1, vector2) => {
  let dx = vector1.x - vector2.x;
  let dy = vector1.y - vector2.y;
  let dz = vector1.z - vector2.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

exports.vectorDistance = vectorDistance;

const sendHelpMessage = value => {
  mp.game.ui.setTextComponentFormat('STRING');
  mp.game.ui.addTextComponentSubstringPlayerName(value);
  mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);
};

exports.sendHelpMessage = sendHelpMessage;

const loadClipSet = (clipSetName) => {
  mp.game.streaming.requestClipSet(clipSetName);
  while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) mp.game.wait(0);
};

exports.loadClipSet = loadClipSet;
