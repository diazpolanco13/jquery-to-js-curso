
const API =  'https://yts.mx/api/v2/list_movies.json';
(async function load() {

    console.time()
    console.log('Buscando peliculas...')

    async function getData(genero) {
    const result = await fetch(API+'?genre='+genero);
    return await result.json();
}
    const actionList =  await getData('action');
    const dramaList =  await getData('drama');
    const animationList =  await getData('animation');

    console.log(actionList, dramaList, animationList);

    console.timeEnd();

    

})()