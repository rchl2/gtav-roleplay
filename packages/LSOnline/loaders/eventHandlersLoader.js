'use strict';

const fs = require('fs-nextra');
const path = require('path');
const dir = path.join(__dirname, '..');
const pattern = new RegExp('event|keys', 'i');
const logger = require('../modules/utils/logger');

module.exports = async () => {
  try {
    const [size] = await fs.scan(dir, { filter: (stats, filepath) => stats.isFile() && path.extname(filepath) === '.js' && path.parse(filepath).name.search(pattern) > 0 })
      .then(files => Promise.all([...files.keys()].map(file => {
        load(path.relative(dir, file));
        return files.size;
      })));

    logger('server', `Loaded ${size} events (including keys) handlers!`, 'info');
  } catch (err) {
    logger('server', `Error while loading event handlers (Error: ${err.message} / ${err.stack})!`, 'error');
  }
};

let load = (file) => {
  const filepath = path.join(dir, file);
  require(filepath);
};
