import express from 'express';

import { router as sociosRouter } from './routes/sociosRouter.js';
import { router as cursosRouter } from './routes/cursosRouter.js';
import { router as actividadesRouter } from './routes/actividadesRouter.js';
import { SociosManager } from './dao/SociosManager.js';
import { ActividadesManager } from './dao/ActividadesManager.js';
import { CursosManager } from './dao/CursosManager.js';

SociosManager.path="./src/data/alumnos.json"
ActividadesManager.path="./src/data/carreras.json"
CursosManager.path="./src/data/cursos.json"

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/socios", sociosRouter)
app.use("/api/cursos", cursosRouter)
app.use("/api/actividades", actividadesRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});