// api key: 2e0a73a6-4887-496f-bcb9-294a0e42b9d3

      // ? Instancia de Axios

const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/'
});

api.defaults.headers.common['X-API-KEY'] = '2e0a73a6-4887-496f-bcb9-294a0e42b9d3';

      // ? llamando nuestras API y sus query parameters y endPoints

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?search?limit=2';

      // ? API endPoint dinamico para hacer los deletes en favorites:

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?search?limit=2`

      // ? API endPoint para suber fotos de gatitos: 

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';


      // ! span para mensajes de error: 

const spanError = document.querySelector('#error');

      // ! cargando los gatos aleatorios

const  loadRandomMichis = async () => { 

const res = await fetch(API_URL_RANDOM)   // * fetch devuelve una promesa, await hace que espere la respuesta del fetch
  const data = await res.json();    // ? convertimos la promesa recibida en un objeto Json, y nos da otra promesa, y await hace que esperemos a que todo esto suceda
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

      // ! Aqui agregamos los catos a FAVORITES

const  loadFavoritesMichis = async () => { 
  
  const res = await fetch(API_URL_FAVORITES, {      // ! Agregando header de autenticacion 
    method: 'GET',
    headers: {
      'X-API-KEY': '2e0a73a6-4887-496f-bcb9-294a0e42b9d3'
    }
  })
  const data = await res.json();   
  console.log('favoritos', data)

  if (res.status !== 200) { 
    spanError.innerHTML = `hubo un error ${res.status} ${data.message}`

  } else { 
    const section = document.querySelector('#favoritesMinchos');
    section.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(michi => {     // ? Estamos recorriendo el array de DATA y eso se queda guardado en michi


      // * Creando los elementos desde JS 

      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');

      // ? Agregando el boton para eliminar los gatitos:

      const btnText = document.createTextNode('Sacar al mich de favoritos');

      // * Formando nuestro html desde JS

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavoriteMichi(michi.id);      // todo: Aqui eliminamos con el boton al gatito en favoritos
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);

    })
  } 
}

      // ! Asi se crea una solicitud de post, (para guardar en favoritos):

const saveFavoriteMichi = async (id) => { 

      // todo: Ver la rama en git de 'sinAxios' para ver como se escribe sin axios
      // ? Estas 3 lineas de abajo y las primeras de arriba son la magia de axios.

  const {data, status} = await api.post('favourites', { 
    image_id: id
  });



  console.log('Save with POST');
  console.log(status);

  if (status !== 200) { 
    spanError.innerHTML = `hubo un error ${status} ${data.message}`
  } else { 
    console.log('Michi guardado en favoritos')
    loadFavoritesMichis();
  }
}

      // ! Eliminando los gatos de favoritos: 

const deleteFavoriteMichi = async (id) => { 
  const res = await fetch(API_URL_FAVORITES_DELETE(id), { 
    method: 'DELETE',
    headers: { 
      'X-API-KEY': '2e0a73a6-4887-496f-bcb9-294a0e42b9d3'
    }
  });
  const data = await res.json();

  if (res.status !== 200) { 
    spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`;
  } else { 
    console.log(`Michi eliminado de favoritos`);
    loadFavoritesMichis();
  }
}


      // ! Subiendo fotos de gatitos

async function uploadMichiPhoto() { 
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form);

  console.log(formData.get('file'));

  const res = await fetch(API_URL_UPLOAD, { 
    method: 'POST',
    headers: { 
      // 'Content-Type': 'multipart/form-data',
      'X-API-KEY': '2e0a73a6-4887-496f-bcb9-294a0e42b9d3'
    },
    body: formData,     // ? FormData agrega automaticamente el Content-Type
  });
  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
  }
  else {
      console.log("Foto de michi cargada :)");
      console.log({ data });
      console.log(data.url);
      saveFavoriteMichi(data.id)
  }
};




      // ! Llamando a las funciones para que se ejecuten al cargar la pagina.

loadRandomMichis();
loadFavoritesMichis();



