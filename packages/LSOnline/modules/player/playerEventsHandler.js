'use strict';
const { validateText } = require('../utils/helpers');
const { setBrutallyWounded, prepareBeforeQuit, createQuitLabel } = require('../player/playerService');

mp.events.add({
  playerQuit: (player, exitType, reason) => {
    prepareBeforeQuit(player, exitType);
    createQuitLabel(player, exitType);
  },

  playerDeath: (player, reason, killer) => setBrutallyWounded(player, reason, killer),

  playerCommand: (player, command) => {
    const args = command.split(/[ ]+/);
    const commandName = args.splice(0, 1)[0].toLowerCase();
    let subCommand = '';

    let result = rp.commands.get(commandName);

    if (!player.isLogged) {
      return player.kick();
    }

    if (!result) {
      return player.call('actionDone', ['Komenda nie istnieje!', 'Podana komenda nie istnieje']);
    }
    
    if (result.hasSubcommands) {
      if (args.length > 0) subCommand = rp.commands.get(commandName + ' ' + args[0].toLowerCase());
      
      if (subCommand) {
        result = subCommand;
        subCommand = args.splice(0, 1);
      }
    }

    // TODO: rework to flags
    /* if (!result.perms) {
      return player.call('actionDone', ['Brak uprawnień!', 'Nie posiadasz wystarczających uprawnień do tej komendy!']);
    }
    */
    if (player.brutallyWounded && result.restriction) {
      return player.call('actionDone', ['Nie możesz tego teraz użyć!', 'Twoja postać jest nieprzytomna lub wyciszona!']);
    }

    if (result.args.length > 0 && args.length < result.args.length) {
      return player.call('actionDone', ['Coś poszło nie tak!', `Użycie: /${commandName} ${subCommand} ${result.tooltip}`]);
    }

    result.run(player, {
      name: subCommand ? `${commandName} ${subCommand}` : commandName,
      fullText: args.join(' '),
      pureText: args.slice(result.args.length, args.length).join(' '),
      args
    }, args);
  },

  playerChat: (player, text) => {
    if (!player.isLogged) {
      return player.kick();
    }

    if (player.brutallyWounded) {
      return player.call('actionDone', ['Nie możesz tego teraz zrobić!', 'Twoja postać jest nieprzytomna!']);
    }

    if (!validateText(text)) {
      return player.call('actionDone', ['Coś poszło nie tak..', 'Użyłeś niedozwolonych znaków na czacie.']);
    }

    rp.commands.get('say').run(player, {fullText: text});
  },

  toggleCrouch: player => {
    if (player.data.isCrouching === undefined) {
      player.data.isCrouching = true;
    } else {
      player.data.isCrouching = !player.data.isCrouching;
    }
  }
});
