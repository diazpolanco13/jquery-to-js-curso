//Api de peliculas
const API = "https://yts.mx/api/v2/list_movies.json";
(async function load() {
<<<<<<< HEAD
  //Funcion asincrona para llamar peliculas del API
=======
  console.log("Buscando peliculas...");
  
>>>>>>> 6550657e9308068b314d2416d14dac6615f64a57
  async function getData(genero) {
    const result = await fetch(API + "?genre=" + genero);
    return await result.json();
  }
  //Guardadno constante de generos de peliculas
  const actionList = await getData("action");
  const dramaList = await getData("drama");
  const animationList = await getData("animation");
<<<<<<< HEAD

  //Search movies
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");
  const $featuringContainer = document.getElementById("featuring");

  //
  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }
=======
  
  //Search movies
  const $form = document.getElementById("form");
  $form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event);
  });
  //console.log(actionList, dramaList, animationList);
>>>>>>> 6550657e9308068b314d2416d14dac6615f64a57

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    $home.classList.add("search-active");
    const $loader = document.createElement("img");
    setAttributes($loader, {
      src: "src/images/loader.gif",
      height: 50,
      width: 50,
    });
    $featuringContainer.append($loader);
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
<<<<<<< HEAD
  //creador de template de las pelcuculas
=======

>>>>>>> 6550657e9308068b314d2416d14dac6615f64a57
  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
<<<<<<< HEAD
  //anadir eventos al hacer click a la pelicula
  function addEventClick($element) {
    $element.addEventListener("click", () => {
      showModal(); //Mostrar overlay
    });
  }
  //renderizado de las peliculas
=======
  function addEventClick($element){
    $element.addEventListener('click', () => {
      alert('Click')
    })
  }

>>>>>>> 6550657e9308068b314d2416d14dac6615f64a57
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

<<<<<<< HEAD
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
=======
  const $featuringContainer = document.getElementById("featuring");
  const $home = document.getElementById("home");

  const $modalImage = modal.querySelector("img");
  const $modalTitle = modal.querySelector("h1");
  const $modalDescription = modal.querySelector("p");
>>>>>>> 6550657e9308068b314d2416d14dac6615f64a57
})();
