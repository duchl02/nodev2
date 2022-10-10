import userService from "../services/userService"

let handelLogin = async (req, res) => {
  let username = req.body.username || '' ; 
  let password = req.body.password || '' ;
  if (!username || !password) {
    return res.json({ message: "Invalid username or password" });
  }
  let userData = await userService.handelUserLogin(username,password)
  if (userData?.user){
    
  } else { 
    userData.user = {}
  }
  return res.status(200).json({
    code: userData.code,
    message: userData.message,
    user: userData.user
  });
};
module.exports = {
  handelLogin: handelLogin,
};
