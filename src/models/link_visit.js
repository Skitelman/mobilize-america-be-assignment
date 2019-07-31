import { DataTypes } from 'sequelize';

export class LinkVisit {
  static load(dbClient) {
    dbClient.define(
      'LinkVisit',
      {
        linkId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Links',
            key: 'id'
          },
          allowNull: false,
        },
        requestIP: {
          type: DataTypes.STRING
        }
      },
      {},
    )
  }
}
export default LinkVisit;

