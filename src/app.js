import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import { router as sociosRouter } from './routes/sociosRouter.js';
import { router as cursosRouter } from './routes/cursosRouter.js';
import { router as vistasRouter } from './routes/vistasRouter.js';
import { router as actividadesRouter } from './routes/actividadesRouter.js';

import { SociosManager } from './dao/SociosManager.js';
import { ActividadesManager } from './dao/ActividadesManager.js';
import { CursosManager } from './dao/CursosManager.js';

let io;

SociosManager.path = "./src/data/socios.json";
ActividadesManager.path = "./src/data/actividades.json";
CursosManager.path = "./src/data/cursos.json";

const PORT = 3000;
const app = express();

// Configurar archivos estáticos
app.use(express.static('src/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/socios", sociosRouter);
app.use(
    "/api/cursos",
    (req, res, next) => {
        req.io = io;
        next();
    },
    cursosRouter
);

app.use("/api/actividades", actividadesRouter);
app.use("/", vistasRouter);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
});

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

io = new Server(server);
