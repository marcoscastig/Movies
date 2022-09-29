const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
const botonbusqueda = document.getElementById("btnBuscar") 
const buscador = document.getElementById("inputBuscar")
const canvasfromtop = document.getElementById("canvasfromtop")
const body = document.getElementById("body1")
const tituloCanvas = document.getElementById("offcanvasTopLabel")
const canvas1 = document.getElementById("parte_a")
const canvas2 = document.getElementById("parte_b")
const canvasboton =document.getElementById("borrar")
const li1 = document.getElementById("li1")
const li2 = document.getElementById("li2")
const li3 = document.getElementById("li3")
const li4 = document.getElementById("li4")
let array = []

function TraerData (url){
    let result = {};   
return fetch(url) 
  .then(response => response.json())
  .then(function(response) {
    result.status = 'ok';
    result.data = response;
    return result;
    
})}

document.addEventListener("DOMContentLoaded", async function(){
    
    TraerData(URL) .then(function(response){
        let busqueda= buscador.value.toLowerCase()
        if(response.status==="ok"){
             cartelera = response.data 
             
botonbusqueda.addEventListener('click', function(){
    if (array.length > 0 ){
        array = []
    }
    
    let busqueda= buscador.value.toLowerCase()
   
    if (busqueda != ""){
        for (let i = 0; i < cartelera.length; i++) {
            const element = cartelera[i]
            let peliculas_titulo = cartelera[i].title.toLowerCase();
            let peliculas_tagline = cartelera[i].tagline.toLowerCase();
            let peliculas_overview = cartelera[i].overview.toLowerCase();
            let titulos = cartelera[i]
            if((peliculas_titulo.indexOf(busqueda) !== -1 ) || (peliculas_tagline.indexOf(busqueda) !== -1 ) || (peliculas_overview.indexOf(busqueda) !== -1 )  ){
                array.push(titulos)
              
            } else  {
                for (let x = 0; x < cartelera[i].genres.length; x++) {
                    const element = cartelera[i].genres[x].name.toLowerCase();
                    if(element.indexOf(busqueda) !== -1 )
                    
                    array.push(cartelera[i])
                   
                }
             }
        } 
    } 
    document.getElementById("inputBuscar").value = ""
    document.getElementById('lista').innerHTML=""
    
    array.forEach(pelicula =>{  
    celda(pelicula)
    })
    
})
        }
        
    })
})

 function celda(pelicula) { //funcion que crea la celda
    
    let node = document.createElement('li');
    node.setAttribute("Pelicula-ID",[pelicula.title]) 
    node.innerHTML =
    `<a href="#">
    <div class="row justify-content-start" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" style="color:black ;">
      <div class="col-6 align-self-start">
        <p class="resaltado mb-0">${pelicula.title}</p>      
      </div>
      <div class="col-6 text-end">
          <p class="mb-0">Vote Average ${tipo_de_puntuacion(pelicula.vote_average)}</p>      
      </div>
      <div class="col align-self-start mb-3 mt-0">
      <p class="text-muted">${pelicula.tagline}</p>      
      </div>
      </div>   
      </a>
    ` 
 document.getElementById('lista').appendChild(node)  
node.addEventListener("click", (event) => {  //fucnion para agregar al canvas y al boton los datos
    peliculaname = node.getAttribute("Pelicula-ID")
    canvas2.innerHTML =""
   for (let e = 0; e < array.length; e++) {
    let titulo = array[e].title
    let overview = array[e].overview
    let release_date = array[e].release_date.slice(0,4)
    let runtime = array[e].runtime
    let budget = array[e].budget
    let revenue = array[e].revenue
    const elementarray = array[e];
    if(titulo.indexOf(peliculaname)!== -1) {
        tituloCanvas.innerHTML = pelicula.title
           canvas1.innerHTML = overview
           li1.innerHTML = `Year :  ${release_date}`
           li2.innerHTML =  `Runtime : ${runtime} min`
           li3.innerHTML = `Budget : ${budget} USD`
           li4.innerHTML = `Revenue : ${revenue} USD`
        for (let y = 0; y < elementarray.genres.length; y++) {
            const element = elementarray.genres[y].name
            canvas2.innerHTML += ` ${element} `
             
        }
    }
    }
  })
  
 }
 
 function tipo_de_puntuacion(x) {
    if (x >=8) {
      return `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>
      `
    } if ((x >= 7) && (x < 8)) {
      return `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star-half-full checked"></span><span class="fa fa-star"></span>
      `
    }
    if ((x >= 6) && (x < 7)) {
      return `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>
      `
    }
    if ((x >= 5) && (x < 6)) {
      return ` <span class="fa fa-star checked "></span><span class="fa fa-star checked"></span><span class="fa fa-star-half-full checked"></span><span class="fa fa-star "></span><span class="fa fa-star "></span>
      `
    }
  }
 


