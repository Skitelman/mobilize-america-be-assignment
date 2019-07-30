import { DataTypes } from 'sequelize';

export class Link {
  static load(dbClient) {
    dbClient.define(
      'Link',
      {
        destinationUrl: DataTypes.STRING,
        shortUrl: DataTypes.STRING,
      },
      {},
    )
  }
}
export default Link;
