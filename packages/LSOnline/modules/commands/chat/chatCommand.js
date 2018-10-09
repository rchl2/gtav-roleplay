const Command = require('../../structures/command');
const { validateText } = require('../../utils/helpers');
const { findPlayerInText } = require('../../utils/helpers');

class ChatCommand extends Command {
  constructor (...args) {
    let [file, options] = args;
    if (options === undefined) options = {};
    super(file, {
      ...options,
      restriction: options.restriction ? true : false
    });
  }

  run (player, fullText, append = false, uppercase = true, validate = true) {
    let text = fullText || '';
    text = text.trim();

    if (text.length === 0) {
      return player.call('actionDone', ['Coś poszło nie tak..', 'Akcja nie może być pusta.']);
    }

    const target = findPlayerInText(text);
    if (!target) {
      return player.call('actionDone', ['Coś poszło nie tak..', 'Podany gracz nie istnieje.']);
    }

    if (typeof target === 'object') {
      text = text.replace(`{${target.id}}`, target.name);
    }

    const lastLetter = text[text.length - 1];
    if (append && !(lastLetter === '.' || lastLetter === '?' || lastLetter === '!')) text += '.';
    if (uppercase) text = text.charAt(0).toUpperCase() + text.slice(1);

    if (validate && !validateText(text)) {
      return player.call('actionDone', ['Coś poszło nie tak..', 'Użyłeś niedozwolonych znaków']);
    }

    return text;
  }
}

module.exports = ChatCommand;
