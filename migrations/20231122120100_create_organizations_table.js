exports.up = function (knex) {
    return knex.schema.createTable('organizations', function (table) {
      table.increments('orgid').primary();
      table.string('orgName');
      table.string('orgaddress');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('organizations');
  };