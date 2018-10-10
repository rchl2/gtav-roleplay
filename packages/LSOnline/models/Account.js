'use strict';

module.exports = (sequelize, DataTypes) => {
  let Account = sequelize.define('core_members', {
    member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    member_group_id: DataTypes.INTEGER,
    members_pass_hash: DataTypes.STRING
  },
  { scopes: {
    withoutPasswordHash: {
      attributes: { exclude: ['members_pass_hash'] }
    }
  },
  timestamps: false
  });

  return Account;
};
