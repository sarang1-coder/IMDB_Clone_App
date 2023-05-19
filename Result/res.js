// Titles:  http://www.omdbapi.com/?s=tt3896198&apikey=8c154485
// details: http://www.omdbapi.com/?i=tt3896198&apikey=8c154485


// get MovieId from localstorage 
let movieID=localStorage.getItem('movieID');

const addToFavBtn = document.querySelector('#fav');

// get favMovies from localstorage 
let favMovies=JSON.parse(localStorage.getItem('favMovies'));

const result=document.querySelector('#result');



// Display Movie Image and Details 
const displayMovieDetails = (details) =>{

    // console.log(details);
    result.innerHTML=`<div id="movie-img">
                                <img src="${(details.Poster !=='N/A') ? details.Poster:"assets/img_not_found.jpg"}" alt="movie-poster"/>
                            </div>

                            <div id="movie-info">

                                <h1 id="movie-title">${details.Title}</h1>

                                <div id="movie-misc-info">
                                    <span id="year">YEAR:&ensp;${details.Year}</span>&emsp;
                                    <span id="rated">&nbsp;RATINGS:&ensp;${details.Rated}</span>&emsp;
                                    <span id="released">RELEASED:&ensp;${details.Released}</span>
                                </div>

                                <p id="genre"><b>GENRE:</b> ${details.Genre}</p>
                                <p id="writer"><b>WRITER:</b> ${details.Writer}</p>
                                <p id="actors"><b>ACTORS: </b>${details.Actors}</p>
                                <p id="plot"><b>PLOT:</b> ${details.Plot}</p>
                                <p id="language"><b>LANGUAGE:</b>
                                     ${details.Language}</p>
                                 <p id="awards"><b><i class="fas fa-award"></i></b>
                                     ${details.Awards}</p>

                            </div>`;


}


// Get Movie Data from API 
async function getData(movieID) {
    const result = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=8c154485`); 
    const movieDetails = await result.json(); 
    displayMovieDetails(movieDetails); 
}


// Add to Favourite Functionality 
const addToFav = () =>{
    
    if(favMovies.includes(movieID)){
        alert('Already Added to Favourite List');
    }else{        
        favMovies.push(movieID); 
        localStorage.setItem('favMovies',JSON.stringify(favMovies));
        addToFavBtn.textContent="Added to List";
        addToFavBtn.style.backgroundColor='red';
        addToFavBtn.style.color='white';
        alert('Movie Added to Favourite List');         
    }
    
}

// console.log(favMovies);


if(movieID){
    getData(movieID);
}


addToFavBtn.style.margin='10px';


// Favourite Btn functionality 
addToFavBtn.addEventListener('click',addToFav);