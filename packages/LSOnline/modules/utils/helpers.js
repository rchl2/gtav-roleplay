'use strict';

const upperString = string => string.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase());

exports.upperString = upperString;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

exports.randomInt = randomInt;

const searchPlayerByIdOrName = searchPlayer => {
  let thisPlayer = null;
  if (!isNaN(searchPlayer)) {
    const playerId = parseInt(searchPlayer);
    thisPlayer = mp.players.at(playerId);
  } else {
    thisPlayer = mp.players.toArray().find(_player => _player.name.toLowerCase().match(searchPlayer.toLowerCase()));
  }
  return thisPlayer;
};

exports.searchPlayerByIdOrName = searchPlayerByIdOrName;

const validateText = (text) => {
  if (!text) return false;
  text = text.trim();
  if (text.length === 0) return false;
  if (text.match(new RegExp(`[^a-ząćśńółęĄĆŚŃÓŁĘA-Z0-9ds!?$% '".:{}]/`, 'g'))) return false;
  return true;
};

exports.validateText = validateText;

const findPlayerInText = (fullText) => {
  if (fullText.search('{') >= 0) {
    const id = fullText.substring(
      fullText.lastIndexOf('{') + 1,
      fullText.lastIndexOf('}')
    );

    if (!id || isNaN(id)) {
      return false;
    }

    const target = mp.players.at(id);
    if (!target) return false;

    return target;
  }
  return true;
};

exports.findPlayerInText = findPlayerInText;
