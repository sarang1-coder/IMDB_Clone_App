// Titles:  http://www.omdbapi.com/?s=tt3896198&apikey=8c154485
// details: http://www.omdbapi.com/?i=tt3896198&apikey=8c154485


const searchBox=document.getElementById('movie-searchbox');
const searchList=document.getElementById('search-list');
const result=document.getElementById('result');


// Create Arr to Store ID in LocalStorage 
if(!localStorage.getItem('favMovies')){
    let favMovies = [];
    localStorage.setItem('favMovies',JSON.stringify(favMovies));
}


// Fetch Search Movie from API 
async function loadMovies(search){
    const URL =`http://omdbapi.com/?s=${search}&page=1&tt3896198&apikey=8c154485`;
    const res=await fetch(`${URL}`);
    const data=await res.json();

    if(data.Response == "True"){
        displayMovieList(data.Search);
    }
}


// If user clicks other than list remove SearchList 
function findMovies(){
    let search=(searchBox.value).trim();
    if(search.length>0){
        searchList.classList.remove('hide-search-list');
        loadMovies(search);
    }else{
        searchList.classList.add('hide-search-list');
    }
}




// Movie Image and Info 
function displayMovieList(movies){

    searchList.innerHTML="";

    for(let i=0;i<movies.length;i++){
        let movieListItem=document.createElement('div');
        movieListItem.dataset.id=movies[i].imdbID;
        movieListItem.classList.add('item');

        if(movies[i].Poster !== 'N/A'){
            moviePoster=movies[i].Poster;
        }else{
            moviePoster="assets/img_not_found.jpg";
        }

        movieListItem.innerHTML=`
        
              <div id="movie-pic">
                    <img src="${moviePoster}"/>
            </div>
            <div id="info">
                    <h3>${movies[i].Title}</h3>
                    <p>${movies[i].Year}</p>
          
            </div>`;

            searchList.appendChild(movieListItem);
    }

    loadMoviesDetails();

}

// Load MovieId in LocalStorage & redirect to Result Page
function loadMoviesDetails(){
    const searchListMovies=searchList.querySelectorAll('.item');

    searchListMovies.forEach(movie =>{
        movie.addEventListener('click',async () => {
            searchList.classList.add('hide-search-list');
            searchBox.value="";
            localStorage.setItem('movieID',movie.dataset.id);
            let dir = window.location.origin + "/IMDB_Clone_APP/Result/res.html"; 
            window.location.href = "./Result/res.html"; 

        });
    });

}



// If user clicks outside searchList then hide searchList 
window.addEventListener('click', (e) => {
    if(e.target.className != 'control'){
        searchList.classList.add('hide-search-list'); 
    }
})



