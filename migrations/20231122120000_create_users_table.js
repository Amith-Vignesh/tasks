// 20231122120000_create_users_table.js
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.integer('age');
      table.string('address');
      table.integer('orgId').unsigned().references('orgid').inTable('organizations');
      table.string('gender');
      table.string('password');
      table.string('userType');
      table.string('email');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  