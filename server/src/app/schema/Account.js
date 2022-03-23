import mongoose from 'mongoose'
import { STATUS } from '../models/StatusEnum';

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      allowNull: false,
    },
    date_expired: {
      type: Date,
      allowNull: false,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      defaultValue: 'pending',
    },
    total_cost: {
      type: Number,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);
export default mongoose.model('Account', AccountSchema)
