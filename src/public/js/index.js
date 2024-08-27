const inputEmail=document.getElementById("email");
const btnSubmit=document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value.trim()
    if(!email){
        alert("Complete email...!!!")
        return
    }

    let respuesta=await fetch("/api/socios/login", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
    })
    let datos=await respuesta.json()

    if(respuesta.status===200){
        
        location.href=`/cursos?id=${datos.socio.id}&actividadID=${datos.socio.actividadID}`
    }else{
        alert(datos.error)
    }
})