import fs from "fs"
export class ActividadesManager{
    static path

    static async get(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    static async create(){
        let actividades=await this.get()
        let id=1
        if(actividades.length>0){
            id=Math.max(...actividades.map(d=>d.id))+1
        }
        actividades.push({
            id, 
            cursando:[]
        })
        await fs.promises.writeFile(this.path, JSON.stringify(actividades, null, 5))
        return id
    }

    static async update(id, actividad={}){
        let actividades=await this.get()
        let indiceActividad=actividades.findIndex(c=>c.id===id)
        if(indiceActividad===-1){
            throw new Error(`${id} de actividad inexistente`)
        }
   
        actividades[indiceActividad]=actividad
        await fs.promises.writeFile(this.path, JSON.stringify(actividades, null, 5))
        return actividades[indiceActividad]
    }
}