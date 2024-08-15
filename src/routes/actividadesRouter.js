import { Router } from 'express';
import { ActividadesManager } from '../dao/ActividadesManager.js';
import { CursosManager } from '../dao/CursosManager.js';

export const router = Router();

router.put('/:actividadID/curso/:cursoID', async (req, res) => {
    let { actividadID, cursoID } = req.params;
    actividadID = Number(actividadID);
    cursoID = Number(cursoID);
    if (isNaN(actividadID) || isNaN(cursoID)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Los id's deben ser numéricos...!!!` });
    }

    let actividades = await ActividadesManager.get();
    let actividad = actividades.find(c => c.id === actividadID);
    if (!actividad) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Actividad inexistente ${actividadID}` });
    }

    let cursos = await CursosManager.get();
    let existe = cursos.find(c => c.id === cursoID);
    if (!existe) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Curso ${cursoID} inexistente...!!!` });
    }

    let indiceCurso = actividad.cursando.findIndex(c => c.cursoID === cursoID);  
    if (indiceCurso !== -1) {
        actividad.cursando[indiceCurso].inscripciones++;
        // Si quieres evitar múltiples inscripciones, descomenta la línea siguiente
        // res.setHeader('Content-Type', 'application/json');
        // return res.status(400).json({ error: `El alumno ya está inscripto en el curso ${cursoID}...!!!` });
    } else {
        actividad.cursando.push({
            cursoID, inscripciones: 1
        });
    }
    
    actividad = await ActividadesManager.update(actividadID, actividad);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ actividad });
});