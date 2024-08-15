import fs from "fs"
import { ActividadesManager } from "./ActividadesManager.js"

export class SociosManager{
    static path

    static async get(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    static async create(socio={}){
        if(!socio.email){
            throw new Error("email es requerido")
        }
        let alumnos=await this.get()
        let existe=socio.find(a=>a.email===socio.email)
        if(existe){
            throw new Error(`${socio.email} ya existe en DB`)
        }
        let id=1
        if(socio.length>0){
            id=Math.max(...socio.map(d=>d.id))+1
        }

        let carreraID=await ActividadesManager.create()

        let nuevoSocio={
            id, 
            ...socio,
            actividadID
        }
        socio.push(nuevoSocio)
        await fs.promises.writeFile(this.path, JSON.stringify(socios, null, 5))
        return nuevoSocio
    }

}

// SociosManager.path
// const SociosManager=new SociosManager()