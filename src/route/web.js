import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/',homeController.getHomePage)
    router.get('/about',homeController.aboutPage)

    router.get('/crud',homeController.getCRUD)
    router.post('/postcrud',homeController.postCRUD)
    router.get('/get-crud',homeController.displayGetCRUD)
    router.get('/edit-crud',homeController.getEditCRUD)
    router.post('/put-crud',homeController.putEditCRUD)
    router.get('/delete-crud',homeController.deleteEditCRUD)

    router.post('/api/login',userController.handelLogin)

    return app.use("/",router);
}
module.exports = initWebRoutes