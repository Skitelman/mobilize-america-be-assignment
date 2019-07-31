import { DataTypes } from 'sequelize';

export class Link {
  static load(dbClient) {
    dbClient.define(
      'Link',
      {
        destinationUrl: {
          type: DataTypes.STRING
        },
        shortUrl:{
          type: DataTypes.STRING
        }
      },
      {},
    )
  }
}
export default Link;
