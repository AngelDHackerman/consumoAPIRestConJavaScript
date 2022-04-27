// const API_URL = 'https://api.thecatapi.com/v1/images/search'; // * endpoint SIN query parameter 

// ? query parameter agregado:
// ? api key: 2e0a73a6-4887-496f-bcb9-294a0e42b9d3
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=2e0a73a6-4887-496f-bcb9-294a0e42b9d3'    


const  reload = async () => { 

  const res = await fetch(API_URL)   // * fetch devuelve una promesa, await hace que espere la respuesta del fetch
  const data = await res.json();    // ? convertimos la promesa recibida en un objeto Json, y nos da otra promesa, y await hace que esperemos a que todo esto suceda
  // const img = document.querySelector('img');
  // img.src = data[0].url;    // * Data contiene lo que la API nos respondion y .url es donde esta el address de nuestro gatito
  
  console.log(data);
  const img1 = document.querySelector('#img1');
  const img2 = document.querySelector('#img2');
  const img3 = document.querySelector('#img3');

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;

  console.log(data[0].url);
}

reload();   // ! Con esto hacemos que la image aparezca al solo terminar de cargar la pagina

