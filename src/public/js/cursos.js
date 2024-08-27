const socket=io()
let h2Socio=document.getElementById("socio")
let ulCursos=document.getElementById("cursos")

const inscribirseCurso=async(cursoID)=>{
    let actividadID=h2Socio.dataset.actividad
    console.log({cursoID, actividadID})

    let respuesta=await fetch(`/api/actividades/${actividadID}/curso/${cursoID}`,{
        method:"put"
    })
    let datos=await respuesta.json()
    console.log(datos, respuesta.status)
    location.reload()
}

socket.on("nuevoCurso", nuevoCurso=>{
    let liNuevoCurso=document.createElement("li")
    liNuevoCurso.innerHTML=`${nuevoCurso.descrip} <button onclick="inscribirseCurso(${nuevoCurso.id})">Inscribirse</button>`
    ulCursos.append(liNuevoCurso)
})