import db from "../models/index";
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let aboutPage = (req, res) => {
  res.render("test/about.ejs");
};
let getCRUD = async (req, res) => {
  res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDservice.createNewUser(req.body);
  console.log(message);
  res.send("postCRUD");
};
module.exports = {
  getHomePage: getHomePage,
  aboutPage: aboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
};
