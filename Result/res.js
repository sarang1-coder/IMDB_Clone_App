// Titles:  http://www.omdbapi.com/?s=tt3896198&apikey=1bed2347
// details: http://www.omdbapi.com/?i=tt3896198&apikey=1bed2347



let movieID=localStorage.getItem('movieID');

const addToFavBtn = document.querySelector('#fav');

let favMovies=JSON.parse(localStorage.getItem('favMovies'));

const result=document.querySelector('#result');


const displayMovieDetails = (details) =>{

    console.log(details);
    result.innerHTML=`<div id="movie-img">
                                <img src="${(details.Poster !=='N/A') ? details.Poster:"assets/img_not_found.jpg"}" alt="movie-poster"/>
                            </div>

                            <div id="movie-info">

                                <h1 id="movie-title">${details.Title}</h1>

                                <div id="movie-misc-info">
                                    <span id="year">Year:&ensp;${details.Year}</span>&emsp;
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
                                     ${details.Awards}
                                    <div id="favbtn"><button id="fav" onclick=addToFav()>Add to Fav</button></div>
                                     </p>

                            </div>`;
    
    const div=document.createElement('div');
    div.setAttribute('id',favbtn);
    const fav=document.createElement('button');
    fav.setAttribute('id',fav);
    fav.innerHTML="Add to Fav";
    fav.style.display="flex";
    fav.style.flexDirection="row-reverse"
    fav.style.backgroundColor="blue";
    div.appendChild(fav);
    result.appendChild(div);




}

async function getData(movieID) {
    const result = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=1bed2347`); //Base URL
    const movieDetails = await result.json(); 
    displayMovieDetails(movieDetails); 
}

if(movieID){
if(favMovies.includes(movieID)){
    addToFavBtn.textContent = 'Already Added To Favourites';
}
}

const addToFav = () =>{
    
    addToFavBtn.textContent = 'Added To Favourites';
    console.log(addToFavBtn);
    
    if(favMovies.includes(movieID)){
        addToFavBtn.textContent = 'Already Added To Favourites';
    }else{
        favMovies.push(movieID); 
        localStorage.setItem('favMovies',JSON.stringify(favMovies)); //set data to localstorage
    }
    
}

console.log(movieID);

if(movieID){
    getData(movieID);
}


addToFavBtn.addEventListener('click',addToFav);