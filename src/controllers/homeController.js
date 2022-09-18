let getHomePage = (req, res) => {
  res.render('homepage.ejs')
};
let aboutPage = (req, res) => {
  res.render('test/about.ejs')
};
module.exports = {
  getHomePage: getHomePage,
  aboutPage: aboutPage,
};
