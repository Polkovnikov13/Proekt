const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // await bcrypt.hash(password, 10);
    const password = await bcrypt.hash('SuperTest63!', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          login: 'Admin',
          name: 'Mister',
          surname: 'Secret',
          password,
          level: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
