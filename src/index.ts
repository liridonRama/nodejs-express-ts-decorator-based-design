import express from "express";
import { router } from "./routes/LoginRoutes";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["dslkfjsdlfjlsd"] }));
app.use(router);



app.listen(3000, () => console.log("listening"))