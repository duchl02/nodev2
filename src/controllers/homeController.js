import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // res.render("homepage.ejs", {
    //   data: JSON.stringify(data),
    // });
    res.json(data);
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
  let message = await CRUDService.createNewUser(req.body);
  res.json(message);
};
let displayGetCRUD = async (req, res) => {
  let users = await CRUDService.getAllUsers();
  res.render("displayCRUD.ejs", { dataUser: users });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserById(userId);
    return res.render("editCRUD.ejs", { user: userData });
  } else {
    return res.json("404 not found");
  }
};
let putEditCRUD = async (req, res) => {
  let data = await req.body;
  let dataUpdate = await CRUDService.upDateUser(data);
  console.log(dataUpdate);
  return res.render("displayCRUD.ejs", { dataUser: dataUpdate });
};
let deleteEditCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
      await CRUDService.deleteUserById(id);
      return res.send('delete user succeed')
  }
  else {
      return res.send('user not found')
  }
};

module.exports = {
  getHomePage: getHomePage,
  aboutPage: aboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putEditCRUD: putEditCRUD,
  deleteEditCRUD: deleteEditCRUD,
};
