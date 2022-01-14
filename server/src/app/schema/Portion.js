import mongoose from 'mongoose'

const PortionSchema = new mongoose.Schema(
  {
    account_id: {
      type: Sequelize.INTEGER,
      references: { model: 'accounts', key: 'id' },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    price: {
      type: Number,
      allowNull: false,
    },
    date_expired: {
      type: Date,
      allowNull: false,
    },
    number_portion: {
      type: Number,
      allowNull: false,
    },
    paid: {
      type: Boolean,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: Date,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);
export const PortionModel = mongoose.model('Portion', PortionSchema)
