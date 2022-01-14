import Sequelize, { Model } from 'sequelize';
import { STATUS } from './StatusEnum';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        status: {
          type: String,
          enum: Object.values(STATUS)
        },
        date_expired: Sequelize.DATEONLY,
        total_cost: Sequelize.DOUBLE,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Portion, { foreignKey: 'account_id', as: 'portion' });
  }
}

export default Account;
