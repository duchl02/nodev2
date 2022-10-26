import userService from "../services/userService";
import emailService from "../services/emailService";
import { request } from "express";

let handelLogin = async (req, res) => {
  let email = req.body.email || "";
  let password = req.body.password || "";
  if (!email || !password) {
    // console.log(email,password)
    return res
      .status(500)
      .json({ message: "Invalid email or password", code: 500 });
  }
  let userData = await userService.handelUserLogin(email, password);
  if (userData?.user) {
  } else {
    userData.user = {};
  }
  return res.status(200).json({
    code: userData.code,
    message: userData.message,
    user: userData.user,
  });
};
const handleGetAllUser = async (req, res) => {
  let id = req.query.id;
  let users = await userService.getAllUsers(id);
  return res.status(200).json({ code: 200, message: "ok", users: users });
};
const handelCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ code: 400, message: "bad request" });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
const handleEditUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ code: 400, message: "bad request" });
  }
  let message = await userService.editUser(req.body);
  return res.status(200).json(message);
};
const handleGetAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCode(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ code: 400, message: "error from sever" });
  }
};
const handleSendEmail = async (req, res) => {
  try {
    if (req.body.email) {
      await emailService.sendEmail(req.body.email);
      res.json({ code: 200, email: req.body.email });
    } else request.json({ code: 400, message: "no email request" });
  } catch (error) {
    res.json({ code: 400, message: "request error" });
  }
};
module.exports = {
  handelLogin: handelLogin,
  handleGetAllUser: handleGetAllUser,
  handelCreateNewUser: handelCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,
  handleGetAllCode: handleGetAllCode,
  handleSendEmail: handleSendEmail,
};
