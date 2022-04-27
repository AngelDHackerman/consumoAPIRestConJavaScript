const URL = 'https://api.thecatapi.com/v1/images/search';

fetch(URL)   // * fetch devuelve una promesa.
  .then(res => res.json())    // * convertimos la promesa recibida en un objeto Json, y nos da otra promesa
  .then(data => {   // ? Data ya tiene todo lo que se puede cargar desde la API. 
    const img = document.querySelector('img');
    img.src = data[0].url;

    console.log(data[0].url);
  })


  // Crear un boton para recargar la pagina