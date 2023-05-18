

const result=document.querySelector("#item-class");

let favMovies=JSON.parse(localStorage.getItem('favMovies'));

console.log(favMovies);


// Get Maovie data from API 
async function getData(movieID) {
    const result = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=8c154485`); //Get data from API
    const movieDetails = await result.json(); //Make data readable
    AddMovies(movieDetails); //Add to DOM
}


// Get all Movies with ID 
favMovies.forEach(id => {
        getData(id); 
});


const AddMovies = (details) =>{

    const child=document.createElement('div');
    child.setAttribute('id',details.imdbID);
    child.setAttribute('class','fav-result');
    child.innerHTML=`<div id="fav-movie-img">
                            <img
                                src="${(details.Poster !=='N/A') ? details.Poster:"assets/img_not_found.jpg"}" alt="movie-poster"/>
                        </div>



                        <div id="fav-movie-info">

                            <h1 id="movie-title"> ${details.Title}</h1>

                            <div id="movie-misc-info">
                                <span id="year"><b>Year</b>:</br>${details.Year}</span>&emsp;
                                <span id="rated">&nbsp;Ratings:&ensp;${details.Rated}</span>&emsp;
                                <span id="released">Released:&ensp;${details.Released}</span>
                            </div>

                            <p id="genre"><b>Genre:</b> ${details.Genre}</p>
                            <p id="writer"><b>Writer:</b> ${details.Writer}</p>
                            <p id="actors"><b>Actors: </b>${details.Actors}</p>
                            <p id="plot"><b>Plot:</b> ${details.Plot}</p>
                            <p id="language"><b>Language:</b>
                                ${details.Language}</p>
                            <p id="awards"><b><i class="fas fa-award"></i></b>
                                ${details.Awards}</p>
                            

                        </div>`

    const deldiv=document.createElement('div');
    const delBtn=document.createElement('button');
    delBtn.setAttribute('class','delete-btn');
    delBtn.innerHTML=`<i data-id="${details.imdbID}" class="fa-solid fa-trash fa-bounce">`;
    delBtn.addEventListener('click',deleteMovie);
    deldiv.appendChild(delBtn);
    child.appendChild(deldiv);
    result.appendChild(child);

}




const deleteMovie = (e) => {
  const delID = e.target.dataset.id;
  const movieIndex = favMovies.indexOf(delID);
  favMovies.splice(movieIndex,1);
  localStorage.setItem('favMovies',JSON.stringify(favMovies));
  window.location.reload();
  alert('Movie Deleted Successfully');
};















