import  express  from "express";

import bodyParser from "body-parser";
import router from "./routes/users.js"
import cors from "cors"

const app = express();


app.use(express.json());
app.use(cors()); 

app.set('view engine', 'ejs'); 
app.set('views', 'views/'); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use("/", router);

app.listen(process.env.PORT, () => console.log(`Server starting on port`)); 