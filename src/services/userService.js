import db from "../models/index";
import bcrypt from "bcryptjs";
// import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
// import { where } from "sequelize/types";
let handelUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isCheck = await checkUserEmail(email);
      if (isCheck) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["password"],
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.code = 201;
            userData.message = "ok";
            delete user.password;
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
const getAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "all") {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
          raw: true,
        });
      }
      if (id && id !== "all") {
        users = await db.User.findOne({
          where: { id: id },
          attributes: { exclude: ["password"] },
          raw: true,
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({ code: 401, message: "email has ready exit" });
      }
      if (data.password) {
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
        resolve({ code: 200, message: "OK" });
      } else {
        console.log("successfully");
        resolve({ code: 400, message: "bad res" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //lưu ý, truyền vào đúng password cần hash
      // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
      let hashPassWord = await bcrypt.hashSync(password, salt);

      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: id } });
      if (!user) {
        resolve({ code: 404, message: "User not found" });
      }
      await db.User.destroy({ where: { id: id } });
      resolve({ code: 200, message: "was delete successfully" });
    } catch (error) {
      reject(error);
    }
  });
};
const editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: data.id }, raw: false });
      if (user) {
        console.log(user);
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve({ code: 200, message: "success" });
      } else {
        resolve({ code: 404, message: "user not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllCode = (typeInput) => {
  return new Promise(async (resolve, reject) => {

    try {
      if (typeInput){
        let data = {};
        let allcode = await db.Allcode.findAll({
          where:{type : typeInput}
        });
        data.code = 200;
        data.data = allcode;
        resolve(data);
      } else{
        resolve({code:400,message:"bad request"})
      }
      
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handelUserLogin: handelUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser: editUser,
  getAllCode: getAllCode,
};
