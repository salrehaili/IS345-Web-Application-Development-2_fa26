import {db} from './index.js';
import { DataTypes } from 'sequelize';

const studentsSchema ={
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  
  const Students = db.sequelize.define('students', studentsSchema, {timestamps: false, freezeTableName: true});

  Students.sync();

  export default Students;