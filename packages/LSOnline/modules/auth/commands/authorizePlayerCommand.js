'use strict';

const logger = require('../../utils/logger');
const service = require('../../auth/authorizationService');
const { loadAccountData } = require('../../account/accountManager');
const { findCharactersForAccount } = require('../../characters/characterManager');

exports.execute = async (player, login, password) => {
  await service.ipbAuth(login, password).then(() => {
    loadAccountData(player, login).then(async () => {
      const chars = await findCharactersForAccount(player.account.id);
      player.call('userAuthorized', [JSON.stringify(chars)]);
    });
  }, (err) => {
    logger('authorization', err, 'error');
  });
};
