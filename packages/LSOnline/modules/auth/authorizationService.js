'use strict';

const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const forumDatabase = require('../database/forumDatabase');

/**
 * Authorize user by checking entered password.
 */
async function ipbAuth (login, password) {
  return forumDatabase.account.findOne({where: { name: login }, rejectOnEmpty: true}).then(account => {
    const passHash = account.members_pass_hash;
    return authorize(login, bcrypt.compareSync(password, passHash));
  });
}

/**
 * Authorize user.
 */
function authorize (login, authorizeCondition = function () {
}) {
  if (!authorizeCondition) {
    throw new Error(`WrongCredentialsError`);
  }

  logger('auth', `User with login "${login}" has been authorized.`, 'info');
}

exports.ipbAuth = ipbAuth;
