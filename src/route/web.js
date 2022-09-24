import express from "express";
import homeController from "../controllers/homeController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/',homeController.getHomePage)
    router.get('/about',homeController.aboutPage)
    router.get('/crud',homeController.getCRUD)
    router.post('/postcrud',homeController.postCRUD)
    return app.use("/",router);
}
module.exports = initWebRoutes