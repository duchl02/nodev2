import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import db from "../models/user";
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassWordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("create new user succeed");
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hasPassword = await bcrypt.hashSync(password, salt);
      resolve(hasPassword);
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
};
