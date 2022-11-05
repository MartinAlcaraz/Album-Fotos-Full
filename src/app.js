import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routerPictures from './routes/pictures.js'
import routerUsers from './routes/users.js'
import path from 'path';
import url from 'url';

if(process.env.NODE_ENV == 'development'){
    dotenv.config();    // carga el contenido del archivo .env dentro de process.env
}

const app = express();
// settings
app.set('port', process.env.PORT || "4000")

//middleware
app.use(cors());

app.use(bodyParser.json({limit: "3mb"}));
app.use(bodyParser.urlencoded({limit: "3mb"}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
const __filename = url.fileURLToPath(import.meta.url);  // retorna la direccion del archivo actual \app.js
const dir = path.dirname(__filename); 
const __dirname = dir.slice(0 , dir.search('\src')) // retorna la direccion de la carpeta .\backend

// hace accesible los archivos de la carpeta ./public
app.use(express.static(path.join(__dirname, "public"))); 


//routes
app.use('/api/pictures', routerPictures);
app.use('/api/users', routerUsers);

export default app;

