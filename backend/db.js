const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('job-portal', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const DBConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
  }
  DBConnect();

module.exports = sequelize;