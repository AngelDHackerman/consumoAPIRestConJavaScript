// const API_URL = 'https://api.thecatapi.com/v1/images/search'; // * endpoint SIN query parameter 

// ? query parameter agregado:
// ? api key: 2e0a73a6-4887-496f-bcb9-294a0e42b9d3
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=2e0a73a6-4887-496f-bcb9-294a0e42b9d3'    
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?search?limit=2&api_key=2e0a73a6-4887-496f-bcb9-294a0e42b9d3'

const spanError = document.querySelector('#error');

const  loadRandomMichis = async () => { 

const res = await fetch(API_URL_RANDOM)   // * fetch devuelve una promesa, await hace que espere la respuesta del fetch
  const data = await res.json();    // ? convertimos la promesa recibida en un objeto Json, y nos da otra promesa, y await hace que esperemos a que todo esto suceda
  // const img = document.querySelector('img');
  // img.src = data[0].url;    // * Data contiene lo que la API nos respondion y .url es donde esta el address de nuestro gatito
  
  console.log('random', data);

  if (res.status !== 200 ) {

    spanError.innerHTML = `Hubo un error ${res.status}`; 
  } else {

    const img1 = document.querySelector('#img1');
    const img2 = document.querySelector('#img2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;
  }
  
  console.log(data[0].url);
}

const  loadFavoritesMichis = async () => { 
  
  const res = await fetch(API_URL_FAVORITES)
  const data = await res.json();   
  console.log('favoritos', data)

  if (res.status !== 200) { 
    spanError.innerHTML = `hubo un error ${res.status} ${data.message}`
    
  }
  
}




loadRandomMichis();
loadFavoritesMichis();

