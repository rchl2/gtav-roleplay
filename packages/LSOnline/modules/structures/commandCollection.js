const Collection = require('./collection');

class CommandsCollection extends Collection {
  constructor () {
    super('commands');
    this.aliases = new Map();
  }

  get (name) {
    let command = super.get(name);
    if (!command) {
      command = this.aliases.get(name);
    }

    return command;
  }

  set (name) {
    super.set(name);
    if (name.aliases.length > 0) {
      name.aliases.forEach(alias => this.aliases.set(alias, name));
    }

    return name;
  }
}

module.exports = CommandsCollection;
