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
    const btn1 = document.querySelector('#btn1');
    const btn2 = document.querySelector('#btn2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

      // * Pasandole los id de las imagenes a los botones

    btn1.onclick = () => saveFavoriteMichi(data[0].id);
    btn2.onclick = () => saveFavoriteMichi(data[1].id);
  }
  
  console.log(data[0].url);
}

      // ! Aqui agregamos los catos a favoritos

const  loadFavoritesMichis = async () => { 
  
  const res = await fetch(API_URL_FAVORITES)
  const data = await res.json();   
  console.log('favoritos', data)

  if (res.status !== 200) { 
    spanError.innerHTML = `hubo un error ${res.status} ${data.message}`

  } else { 
    data.forEach(michi => {     // ? Estamos recorriendo el array de DATA y eso se queda guardado en michi

      // * Seleccionando donde vamos a incrustar el codigo.

      const section = document.querySelector('#favoritesMinchos');

      // * Creando los elementos desde JS 

      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al mich de favoritos');

      // * Formando nuestro html desde JS

      btn.appendChild(btnText);
      img.src = michi.image.url;
      img.width = 150;
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);

    })
  }
  
}

      // ! Asi se crea una solicitud de post:

const saveFavoriteMichi = async (id) => { 
  const res = await fetch(API_URL_FAVORITES, {   
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      image_id: id,
    })
  });

  const data = await res.json(); // ? Aqui parseamos el objeto res a un JSON que podemos entender en el frontEnd.

  console.log('Save with POST');
  console.log(res);

  if (res.status !== 200) { 
    spanError.innerHTML = `hubo un error ${res.status} ${data.message}`
  }
}


loadRandomMichis();
loadFavoritesMichis();
