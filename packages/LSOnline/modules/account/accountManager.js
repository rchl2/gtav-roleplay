'use strict';

const logger = require('../utils/logger');
const sprintf = require('sprintf-js').sprintf;
const forumDb = require('../database/forumDatabase');
const accountModel = require('../../models/Account');
const accountMeta = require('../account/accountModuleMeta');

exports.loadAccountData = async function loadAccountData (player, accountName) {
  await forumDb.connection.query(sprintf(
    accountMeta.HASH_SELECT_QUERY_PATTERN,
    'member_id, member_group_id',
    accountMeta.IPB_MEMBERS_TABLE,
    accountName
  )).spread((results, metadata) => {
    let data = results[0];
    data.name = accountName;

    player.isLogged = true;
    player.account = hydrateAccount(accountModel.create(), data);
    logger('authorization', 'Account data saved into player entity.', 'info');
    return player;
  });
};

const hydrateAccount = (account, data) => {
  account.id = data.member_id;
  account.name = data.name;
  account.groupId = data.member_group_id;
  return account;
};
