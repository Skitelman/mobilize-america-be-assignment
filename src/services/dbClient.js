import Sequelize from 'sequelize';
import * as databaseConfig from '../../config/database.json';
import Link from '../models/Link';

const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];

const options = {
  host: config.host,
  dialect: config.dialect,
  logging: console.log,
}

const dbClient = new Sequelize(config.database, config.username, config.password, options);

Link.load(dbClient);

export default dbClient;
