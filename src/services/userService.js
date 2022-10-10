import db from "../models/index";
import bcrypt from "bcryptjs";
let handelUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isCheck = await checkUserEmail(email);
      if (isCheck) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes:  ["email", "roleid", "password"] ,
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.code = 201;
            userData.message = "ok";
            delete user.password
            userData.user = user;
          } else {
            userData.code = 400;
            userData.message = "check password wrong";
          }
        } else {
          userData.code = 300;
          userData.message = "user not found";
        }
      } else {
        userData.code = 300;
        userData.message = "user not found";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handelUserLogin: handelUserLogin,
};
