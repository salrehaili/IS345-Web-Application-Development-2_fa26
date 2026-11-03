import Sequelize from 'sequelize';

const db  = {};
const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: './lab10.db',
    logging: false
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {db};