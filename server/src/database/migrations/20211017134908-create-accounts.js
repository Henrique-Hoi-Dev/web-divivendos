module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'paid', 'cencelled'],
        defaultValue: 'pending'
      },
      date_expired: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      total_cost: {
        type: Sequelize.DOUBLE,
        defaultValue: '0',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('accounts');
  },
};
