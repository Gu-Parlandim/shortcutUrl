import express, { NextFunction, Request, Response }  from "express";
import MongoConnection from "./database/MongoConnection";
import shortURL from "./routes/shorturl.route";
const app = express();



//porta do servidor

const port = process.env.PORT || 3000;

//Configurações do servidor
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000/',);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});



//conectado com o bando de dados
MongoConnection.connect();

//usando as rotas
app.use(shortURL);


//status do servidor
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
})



//inicando o servidor na porta 5000
app.listen(port, () => {
    console.log(`servidor online`)
});