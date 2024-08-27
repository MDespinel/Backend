import { Router } from 'express';
import { SociosManager } from '../dao/SociosManager.js';
import { CursosManager } from '../dao/CursosManager.js';
import { ActividadesManager } from '../dao/ActividadesManager.js';
export const router=Router()

router.get('/',(req,res)=>{

    

    res.setHeader('Content-Type','text/html')
    res.status(200).render("index")
})

router.get('/cursos', async(req,res)=>{
    let {id, actividadID}=req.query
    if(!id || !actividadID){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete id / actividadID`})
    }

    id=Number(id)
    actividadID=Number(actividadID)
    if(isNaN(id) || isNaN(actividadID)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Formato argumentos inválido...!!!`})
    }

    let socios=await SociosManager.get()
    let socio=socios.find(a=>a.id===id)
    if(!socio){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`socio con id ${id} inexistente`})
    }

    let cursos=await CursosManager.get()

    let actividades=await ActividadesManager.get()
    let actividad=actividades.find(c=>c.id===actividadID)
    if(!actividad){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Problemas con los datos del socio`})
    }

    actividad.cursando.forEach(curso=>{
        let {descrip}=cursos.find(c=>c.id===curso.cursoID)
        if(!descrip){
            console.log(`Error con algun curso del socio ${id}. Id curso: ${curso.cursoID}`)
        }else{
            curso.descrip=descrip
        }
    })

    console.log(actividad)

    res.setHeader('Content-Type','text/html')
    res.status(200).render("cursos",{
        socio,
        actividad, 
        cursos
    })
})