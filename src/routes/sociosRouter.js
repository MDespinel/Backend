import { Router } from 'express';
import { SociosManager } from '../dao/SociosManager.js';
import { ActividadesManager } from '../dao/ActividadesManager.js';
import { CursosManager } from '../dao/CursosManager.js';

export const router = Router();

router.get('/', async (req, res) => {
    try {
        let socios = await SociosManager.get();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ socios });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle: `${error.message}`
        });
    }
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un id numérico` });
    }

    let socios = await SociosManager.get();
    let socio = socios.find(a => a.id === id);
    if (!socio) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No existe socio con id ${id}` });
    }

    let actividades = await ActividadesManager.get();
    let actividad = actividades.find(c => c.id === socio.actividadID);
    if (!actividad) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error en los datos del socio` });
    }

    let cursosSocio = [];
    let cursos = await CursosManager.get();
    socio.actividades.forEach(c => {
        let datos = cursos.find(curso => curso.id === c.cursoID);
        if (datos) {
            cursosSocio.push(datos);
        }
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ socio, cursosSocio });
});

router.post('/login', async (req, res) => {
    let { email } = req.body;
    if (!email) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Complete email` });
    }
    let socios = await SociosManager.get();
    let socio = socios.find(a => a.email === email);
    if (!socio) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Error: socio inexistente con email ${email}` });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ socio });
});

router.post("/", async (req, res) => {
    let { nombre, email } = req.body;
    if (!nombre || !email) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Complete nombre / email` });
    }

    try {
        let nuevoSocio = await SociosManager.create({ nombre, email });
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ nuevoSocio });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle: `${error.message}`
        });
    }
});