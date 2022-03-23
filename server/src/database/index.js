import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
require('dotenv/config');

import Account from '../app/models/Account';
import Portion from '../app/models/Portion';

import databaseConfig from '../config/database';

const models = [Account, Portion];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connetion = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connetion))
      .map(
        (model) => model.associate && model.associate(this.connetion.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}

export default new Database();
