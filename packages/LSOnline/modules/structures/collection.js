const path = require('path');
const fs = require('fs-nextra');
const logger = require('../utils/logger');

class Collection extends Map {
  constructor (name) {
    super();
    this.name = name;
    this.dir = path.join(__dirname, '..', name);
  }

  set (piece) {
    const exists = this.get(piece.name);
    if (exists) {
      this.delete(piece.name);
    }

    super.set(piece.name, piece);
    return piece;
  }

  delete (piece) {
    const exists = this.get(piece);
    if (!exists) {
      return false;
    }

    return super.delete(piece);
  }

  load (file) {
    const filepath = path.join(this.dir, file);
    try {
      const parsedFile = { path: file, name: path.parse(filepath).name };
      const piece = new (require(filepath))(parsedFile.name);

      this.set(piece);
      delete require.cache[filepath];
      return piece;
    } catch (error) {
      logger('command', `Command error: ${error} at ${filepath}!`, 'error');
    }
  }

  async loadFiles () {
    this.clear();
    await this.walkFiles();

    return {
      size: this.size,
      max: this.max
    };
  }

  async walkFiles () {
    return fs.scan(this.dir, { filter: (stats, filepath) => stats.isFile() && path.extname(filepath) === '.js' })
      .then(files => Promise.all([...files.keys()].map(file => {
        this.max = files.length;
        this.load(path.relative(this.dir, file));
      })))
      .catch(error => {
        logger('command', `[Collection: ${this.name}] ${error}`, 'error');
      });
  }
}

module.exports = Collection;
