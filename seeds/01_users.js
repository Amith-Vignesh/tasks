// 01_users.js
exports.seed = function (knex) {
    return knex('users').del()
      .then(function () {
        return knex('users').insert([
          { username: 'user1', age: 25, address: 'Address 1', orgId: 1, gender: 'Male', password: 'password1', userType: 'user', email: 'user1@example.com' },
          // Add more seed data as needed
        ]);
      });
  };
  