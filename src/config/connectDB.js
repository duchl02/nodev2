const { Sequelize } = require("sequelize");
// test git edit in github asfsadfasdfsdfsd
// Option 1: Passing a connection URI

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("duc_sql", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
let connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectdb;
