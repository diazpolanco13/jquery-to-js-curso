//Api de peliculas
const API = "https://yts.mx/api/v2/list_movies.json";
const BASE_API = "https://yts.mx/api/v2/";

(async function load() {
  //Funcion asincrona para llamar peliculas del API
  async function getData(url) {
    const result = await fetch(url);
    return await result.json();
  }
  //Search movies
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");
  const $featuringContainer = document.getElementById("featuring");

  //Formulario

  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  function featuringTemplate(peli) {
    return `<div class="featuring">
    <div class="featuring-image">
    <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
    </div>
    <div class="featuring-content">
    <p class="featuring-title">Pelicula encontrada</p>
    <p class="featuring-album">${peli.title}</p>
    </div>
    </div>`;
  }
  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    $home.classList.add("search-active");
    const $loader = document.createElement("img");
    setAttributes($loader, {
      src: "src/images/loader.gif",
      height: 50,
      width: 50,
    });
    $featuringContainer.append($loader);

    //parsear Formulario
    const data = new FormData($form);
    const {
      data: { movies: pelis },
    } = await getData(
      `${BASE_API}list_movies.json?limit=1&query_term=${data.get("name")}`
    );
    const HTMLString = featuringTemplate(pelis[0]);
    $featuringContainer.innerHTML = HTMLString;
  });

  // Template de las peliculas
  function videoItemTemplate(movie, category) {
    return `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
        <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
        ${movie.title}
        </h4>
        </div>`;
  }
  //creador de template de las pelcuculas
  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  //anadir eventos al hacer click a la pelicula
  function addEventClick($element) {
    $element.addEventListener("click", () => {
      showModal($element); //Mostrar overlay
    });
  }
  //renderizado de las peliculas
  function renderMoviesList(listaPeliculas, $container, category) {
    $container.children[0].remove(); //Eliminar img carga
    listaPeliculas.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      const image = movieElement.querySelector('img');
      image.addEventListener('load', (event) => {
        event.target.classList.add('fadeIn')

      })
      addEventClick(movieElement);
    });
  }


  
  
  const { data: { movies: actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`);
  const $actionContainer = document.getElementById("action");
  renderMoviesList(actionList, $actionContainer, "action");
  
  const { data: { movies: dramaList } } = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const $dramaContainer = document.getElementById("drama");
  renderMoviesList(dramaList, $dramaContainer, "drama");
  
  const { data: { movies: animationList } } = await getData(`${BASE_API}list_movies.json?genre=animation`);
  const $animationContainer = document.getElementById("animation");
  renderMoviesList(animationList, $animationContainer, "animation");


  const $modal = document.getElementById("modal");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");

  const $modalImage = modal.querySelector("img");
  const $modalTitle = modal.querySelector("h1");
  const $modalDescription = modal.querySelector("p");

// Modal de las peliculas
  function findById(list, id){
    return list.find(movie => movie.id === parseInt(id, 10));
  }
  function findMovie(id, category) {
    switch(category) {
      case 'action' : {
        return findById(actionList, id)
      }
      case 'drama' : {
        return findById(dramaList, id)
      }
      default : {
        return findById(animationList, id)
        
      }
    }
  }
  function showModal($element) {
    $overlay.classList.add("active");
    $modal.style.animation = "modalIn .8s forwards";
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    const data = findMovie(id, category);

    $modalTitle.textContent = data.title;
    $modalImage.setAttribute('src', data.medium_cover_image);
    $modalDescription.textContent = data.description_full;
  }
  $hideModal.addEventListener("click", hideModal);
  
  function hideModal() {
    $overlay.classList.remove("active");
    $modal.style.animation = "modalOut .8s forwards";
  }
})();
