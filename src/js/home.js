const API = "https://yts.mx/api/v2/list_movies.json";
(async function load() {
  console.log("Buscando peliculas...");

  async function getData(genero) {
    const result = await fetch(API + "?genre=" + genero);
    return await result.json();
  }
  const actionList = await getData("action");
  const dramaList = await getData("drama");
  const animationList = await getData("animation");

  console.log(actionList, dramaList, animationList);


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
  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  function renderMoviesList(list, $container) {
    $container.children[0].remove(); //Eliminar img carga
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
    });
  }


  const $actionContainer = document.getElementById("action");
  renderMoviesList(actionList.data.movies, $actionContainer)

  const $dramaContainer = document.getElementById("drama");
  renderMoviesList(dramaList.data.movies, $dramaContainer)

  const $animationContainer = document.getElementById("animation");
  renderMoviesList(animationList.data.movies, $animationContainer)


  
  const $modal = document.getElementById("modal");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");

  const $featuringContainer = document.getElementById("featuring");
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");

  const $modalImage = modal.querySelector("img");
  const $modalTitle = modal.querySelector("h1");
  const $modalDescription = modal.querySelector("p");


})();
