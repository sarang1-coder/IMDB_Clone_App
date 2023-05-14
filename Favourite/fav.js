

const result=document.querySelector("#item-class");

let favMovies=JSON.parse(localStorage.getItem('favMovies'));

async function getData(movieID) {
    const result = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=1bed2347`); //Get data from API
    const movieDetails = await result.json(); //Make data readable
    AddMovies(movieDetails); //Add to DOM
}

//Get all Favourite movies
favMovies.forEach(id => {
        getData(id); // Get Movie from API with ID
});


const AddMovies = (details) =>{

    const child=document.createElement('div');
    child.setAttribute('id',details.imdbID);
    child.setAttribute('class','result');
    child.innerHTML=`<div id="movie-img">
                            <img
                                src="${(details.Poster !=='N/A') ? details.Poster:"assets/img_not_found.jpg"}" alt="movie-poster"/>
                        </div>



                        <div id="movie-info">

                            <h1 id="movie-title"> ${details.Title}</h1>

                            <div id="movie-misc-info">
                                <span id="year">Year:&ensp;2017</span>&emsp;
                                <span id="rated">&nbsp;Ratings:&ensp;PG-13&nbsp;</span>&emsp;
                                <span id="released">Released:&ensp;05&nbsp;May&nbsp;2017</span>
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

    const delBtn=document.createElement('button');
    delBtn.setAttribute('class','delete-btn');
    delBtn.innerHTML=`<i data-id="${details.imdbID}" class="fa-solid fa-trash fa-bounce"></i>`;
    delBtn.addEventListener('click',deleteMovie);
    child.appendChild(delBtn);
    result.appendChild(child);

}


const deleteMovie =(e) =>{

    const delMovie=e.target.dataset.id;

    const movie=document.getElementById(`${delMovie}`);

    movie.remove();

    favMovies=favMovies.filter(id => id!=delMovie);

    localStorage.setItem('favMovies',JSON.stringify(favMovies));

}




