# consumoAPIRestConJavaScript

Las **API Rest** son interfaces para comunicar robots por medio de internet (http). 

NO responden con HTML estas interfaces responden con **JSON**.

## Nuestra API para el proyecto: 

https://thecatapi.com/ 

Tambien se pueden ver mas API's publicas en el siguiente repo: 
https://github.com/public-apis/public-apis


## Endpoints y Query parameters 

Son una de las formas en las que podemos modificar el resultado que nos va a dar nuestra API Rest. 

Los **Endpoints** son rutas, y una API puede tener distintas rutas 

- Ejemplos: 

1. api.com/breeds 
2. api.com/categories
3. api.com/images
4. api.com/images/gatito35

Los **Query parameters** son informacion extra a los endpoints (rutas), para que podamos limitar o especificar mucho mejor cual es el contenido que queremos pedirle a nuestra API.

Ejemplos: 


> Traenos las **primeras 5 razas** (breeds) de la **pagina 2**.

/breeds?limit=5&page=2

> Traenos lo que este en la **categoria 'fun'**.

/categories?search=fun       

> Traenos solo los de la **categoria 3**.

/images?category=3           

> Traenos las del **gatito35 pero solo formato png**.

/images/gatito35?format=png  




Leer la **documentacion** de la API a usar es siempre util