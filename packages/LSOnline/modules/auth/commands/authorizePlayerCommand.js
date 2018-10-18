'use strict';

const service = require('../../auth/authorizationService');
const { loadAccountData } = require('../../account/accountManager');
const { findCharactersForAccount } = require('../../characters/characterManager');

exports.execute = async (player, login, password) => {
  try {
    await service.ipbAuth(login, password).then(() => {
      loadAccountData(player, login).then(async () => {
        const characters = await findCharactersForAccount(player.account.member_id);
        delete player.tries;
        player.call('handleAuthResponse', [JSON.stringify({characters})]);
      });
    });
  } catch (err) {
    if (err.name === 'SequelizeEmptyResultError') {
      player.call('handleAuthResponse', [JSON.stringify({
        errors: true,
        message: 'Konto o podanej nazwie użytkownika nie istnieje.'
      })]);
    }
    if (err.message === 'WrongCredentialsError') {
      player.tries ? player.tries++ : player.tries = 0;
      player.call('handleAuthResponse', [JSON.stringify({
        errors: true,
        message: 'Hasło jest nieprawidłowe.'
      })]);
    }
    if (player.tries > 3) player.kick('Zbyt dużo niepoprawnych logowań');
  }
};
