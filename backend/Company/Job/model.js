// const { Sequelize, DataTypes } = require('sequelize')
// const sequelize = require('../../db')

// const Job = sequelize.define(
//     'Job', {
//     Company_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     Job_ID: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

//     Position: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     Location: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

//     Package: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     Skills: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

//     Experience:{
//         type: DataTypes.FLOAT,
//         allowNull:false
//     },
//     Description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }
// );


// module.exports = Job;

// Company/Job/model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Job = sequelize.define('Job', {
    Company_name: { type: DataTypes.STRING, allowNull: false },
    Job_ID: { type: DataTypes.STRING, allowNull: false },
    Position: { type: DataTypes.STRING, allowNull: false },
    Location: { type: DataTypes.STRING, allowNull: false },
    Package: { type: DataTypes.STRING, allowNull: false },
    Skills: { type: DataTypes.STRING, allowNull: false },
    Experience: { type: DataTypes.INTEGER, allowNull: false }, // Ensure this is correct
    Description: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Job;
