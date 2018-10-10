'use strict';

const logger = require('../utils/logger');
const forumDatabase = require('../database/forumDatabase');

/**
 * Find account by name and save data into player entity.
 */
exports.loadAccountData = async (player, accountName) => {
  await forumDatabase.account.scope('withoutPasswordHash').findOne({where: { name: accountName }}).then(account => {
    player.isLogged = true;
    player.account = account.dataValues;

    logger('auth', 'Account data saved into player entity.', 'info');
    return player;
  });
};
