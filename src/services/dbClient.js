import Sequelize from 'sequelize';
import * as databaseConfig from '../../config/database.json';
import Link from '../models/link';
import LinkVisit from '../models/link_visit';

const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];

const options = {
  host: config.host,
  dialect: config.dialect,
  logging: console.log,
}

const dbClient = new Sequelize(config.database, config.username, config.password, options);

Link.load(dbClient);
LinkVisit.load(dbClient);

const LinkModel = dbClient.models.Link;
const LinkVisitModel = dbClient.models.LinkVisit;

LinkVisitModel.belongsTo(LinkModel);
LinkModel.hasMany(LinkVisitModel);

export default dbClient;
