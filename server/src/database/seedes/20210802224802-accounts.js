module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'accounts',
      [
        {
          name: 'Account modelo 1',
          status: 'pending',
          total_cost: 900,
          date_expired: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account modelo 2',
          status: 'paid',
          total_cost: 600,
          date_expired: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account modelo 3',
          status: 'cencelled',
          total_cost: 300,
          date_expired: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account modelo 4 vencida',
          status: 'pending',
          total_cost: 100,
          date_expired: '2021-08-01 15:36:56',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('accounts', null, {}),
};
