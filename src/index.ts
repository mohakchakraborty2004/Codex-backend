import  express  from "express";
import router from "./routes/AuthRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("api/v1", router);

app.listen(3000);
console.log("server running on port 3000");

