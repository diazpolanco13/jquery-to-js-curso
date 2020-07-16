//Api de peliculas
const API = "https://yts.mx/api/v2/list_movies.json";
const BASE_API = "https://yts.mx/api/v2/";

(async function load() {
  //Funcion asincrona para llamar peliculas del API
  async function getData(url) {
    const result = await fetch(url);
    return await result.json();
  }
  //Guardadno constante de generos de peliculas
  const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
  const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);

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
    const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
    const HTMLString = featuringTemplate(peli.data.movies[0]);
    $featuringContainer.innerHTML = HTMLString;
    debugger;
  });

  // Template de las peliculas
  function videoItemTemplate(movie) {
    return `<div class="primaryPlaylistItem">
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
      showModal(); //Mostrar overlay
    });
  }
  //renderizado de las peliculas
  function renderMoviesList(listaPeliculas, $container) {
    $container.children[0].remove(); //Eliminar img carga
    listaPeliculas.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement);
    });
  }

  const $actionContainer = document.getElementById("action");
  renderMoviesList(actionList.data.movies, $actionContainer);

  const $dramaContainer = document.getElementById("drama");
  renderMoviesList(dramaList.data.movies, $dramaContainer);

  const $animationContainer = document.getElementById("animation");
  renderMoviesList(animationList.data.movies, $animationContainer);

  const $modal = document.getElementById("modal");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");

  const $modalImage = modal.querySelector("img");
  const $modalTitle = modal.querySelector("h1");
  const $modalDescription = modal.querySelector("p");

  function showModal() {
    $overlay.classList.add("active");
    $modal.style.animation = "modalIn .8s forwards";
  }
  $hideModal.addEventListener("click", hideModal);
  function hideModal() {
    $overlay.classList.remove("active");
    $modal.style.animation = "modalOut .8s forwards";
  }
})();
