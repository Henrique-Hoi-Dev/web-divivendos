import Sequelize, { Model } from 'sequelize';

class Portion extends Model {
  static init(sequelize) {
    super.init(
      {
        account_id: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
        number_portion: Sequelize.DECIMAL,
        date_expired: Sequelize.DATEONLY,
        paid: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
  }
}

export default Portion;
