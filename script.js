// Titles:  http://www.omdbapi.com/?s=tt3896198&apikey=1bed2347
// details: http://www.omdbapi.com/?i=tt3896198&apikey=1bed2347

const searchBox=document.getElementById('movie-searchbox');
const searchList=document.getElementById('search-list');
const result=document.getElementById('result');



if(!localStorage.getItem('favMovies')){
    let favMovies = [];
    localStorage.setItem('favMovies',JSON.stringify(favMovies));
}


async function loadMovies(search){
    const URL =`http://omdbapi.com/?s=${search}&page=1&tt3896198&apikey=1bed2347`;
    const res=await fetch(`${URL}`);
    const data=await res.json();
    console.log(data.Search);
    if(data.Response == "True"){
        displayMovieList(data.Search);
    }
}


function findMovies(){
    let search=(searchBox.value).trim();
    if(search.length>0){
        searchList.classList.remove('hide-search-list');
        loadMovies(search);
    }else{
        searchList.classList.add('hide-search-list');
    }
}


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

function loadMoviesDetails(){
    const searchListMovies=searchList.querySelectorAll('.item');
    searchListMovies.forEach(movie =>{
        movie.addEventListener('click',async () => {
            searchList.classList.add('hide-search-list');
            searchBox.value="";
            // const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=1bed2347`);
            // const movieDetails = await result.json();
            // displayMovieDetails(movieDetails);
            localStorage.setItem('movieID',movie.dataset.id);
            let dir = window.location.origin + "/IMDB_Clone/Result/res.html"; // Custom URL for result page
            window.location.href = "./Result/res.html"; //Redirect to a new page(add github location)

        });
    });

}


window.addEventListener('click', (e) => {
    if(e.target.className != 'control'){
        searchList.classList.add('hide-search-list'); // Hide autocomplete box if user click anywhere other than autocomplete box
    }
})



// function displayMovieDetails(details){
//     result.innerHTML=`<div id="movie-img">
//                                 <img src="${(details.Poster !=='N/A') ? details.Poster:"assets/img_not_found.jpg"}" alt="movie-poster"/>
//                             </div>

//                             <div id="movie-info">

//                                 <h1 id="movie-title">${details.Title}</h1>

//                                 <div id="movie-misc-info">
//                                     <span id="year">Year:&ensp;${details.Year}</span>&emsp;
//                                     <span id="rated">&nbsp;Ratings:&ensp;${details.Rated}</span>&emsp;
//                                     <span id="released">Released:&ensp;${details.Released}</span>
//                                 </div>

//                                 <p id="genre"><b>Genre:</b> ${details.Genre}</p>
//                                 <p id="writer"><b>Writer:</b> ${details.Writer}</p>
//                                 <p id="actors"><b>Actors: </b>${details.Actors}</p>
//                                 <p id="plot"><b>Plot:</b> ${details.Plot}</p>
//                                 <p id="language"><b>Language:</b>
//                                     ${details.Language}</p>
//                                 <p id="awards"><b><i class="fas fa-award"></i></b>
//                                     ${details.Awards}
//                                     <div id="fav" onclick="favourite(this)"><button>Add to Favourite</button></div></p>

//                             </div>`
// }

// function favourite(data){
//     console.log('clicked');
//     makeFavList(data.parentNode.dataset.poster);
// }


// let enterMyFav=false; 

// function myFav(){
//     if(enterMyFav){
//         enterMyFav=false;
//         exitMyFav();
//     }else{
//         enterMyFav=true;
//         showMyFav();
//     }
// }


// function showMyFav(){

//     let arr=JSON.parse(localStorage.getItem('movies'));
    
//     if(arr==null || arr.length==0){
//         window.alert("Your List is Empty,Plz add movies");
//         return;
//     }

//         for (var i = 0; i < arr.length; i++) {
//         let movieListItem = document.createElement('div');
//         movieListItem.dataset.id = i;
//         movieListItem.classList.add('fav-res-img');
//         movieListItem.style.backgroundImage = `url(${arr[i]})`;
//         movieListItem.classList.add('rounded-lg');
//         movieListItem.classList.add('flex');
//         movieListItem.classList.add('items-end');
//         movieListItem.innerHTML = `
//         <button class="remove-fav" onclick="removeMovie(${i})">
//             <p class="shadow-2xl p-2"><i class="fa-solid fa-trash text-xl"></i></p>
//         </button>
//         `;
//         document.querySelector('.fav-list').appendChild(movieListItem);
//         document.querySelector('#favourite-result').style.opacity = "1";
    
//         }
// }


// function exitMyFav(){
//         let arr = JSON.parse(localStorage.getItem("movies"));
//     if(arr == null || arr.length == 0) {
//         window.alert("You've not added any movie into the list yet.");
//         return;
//     }
//     document.querySelector('#favourite-result').style.opacity = "0";
//     document.querySelector('.fav-list').innerHTML = "";
// }

// function makeFavList(params){
//     if(localStorage.length==0){
//         movies=[];
//         movies.push(params);
//         localStorage.setItem("movies",JSON.stringify(movies));
//     }else{
//         movies=JSON.parse(localStorage.getItem("movies"));
//         movies.push(params);
//         localStorage.setItem("movies",JSON.stringify(movies));
//     }
// }

// function removeMovie(idx) {
//     let arr = JSON.parse(localStorage.getItem("movies"));
//     arr.splice(idx, 1);
//     localStorage.setItem("movies", JSON.stringify(arr));
//     document.querySelector('.fav-list').innerHTML = "";
//     if(arr.length == 0) {
//         document.querySelector('.fav-list').innerHTML = "";
//         document.querySelector('#favourite-result').style.opacity = "0";
//         exitMyFav();
//     }
//     showMyFav();
// }


// function clearList(){
//     exitFavPage();
//     localStorage.clear();
// }



