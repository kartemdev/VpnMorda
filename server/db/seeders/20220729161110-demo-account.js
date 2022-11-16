const sha256 = require('sha256');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Accounts', [{
      ac_name: 'vpnuser1',
      pass: sha256('qcf73YA'),
      user_id: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'Supra',
      pass: sha256('123'),
      user_id: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'Civic',
      pass: sha256('123'),
      user_id: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'Roadster',
      pass: sha256('123'),
      user_id: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'Jawa',
      pass: sha256('123'),
      user_id: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'Kawasaki',
      pass: sha256('123'),
      user_id: 2,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'Honda',
      pass: sha256('123'),
      user_id: 2,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'Alpina',
      pass: sha256('123'),
      user_id: 2,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'Huscvarna',
      pass: sha256('123'),
      user_id: 2,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ac_name: 'KTM',
      pass: sha256('123'),
      user_id: 2,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};
