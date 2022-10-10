import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectdb from "./config/connectDB"

require("dotenv").config();
let port = process.env.PORT || 8080;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);

connectdb();
app.listen(8080, () => {
  console.log("Express server listening on port " + port);
});
