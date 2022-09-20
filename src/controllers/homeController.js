import db from "../models/index";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    res.render("homepage.ejs",{
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let aboutPage = (req, res) => {
  res.render("test/about.ejs");
};
module.exports = {
  getHomePage: getHomePage,
  aboutPage: aboutPage,
};
