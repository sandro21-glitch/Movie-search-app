'use strict';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=828c13a74325561d89287c5362b8ff4b&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=828c13a74325561d89287c5362b8ff4b&query="';


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    moviesData(data.results);
    // console.log(data);
}

function moviesData(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML =`
        <div class="movie">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-title">
                <h3>${title}</h3>
                <span class="${voteColor(vote_average)}"${voteColor()}>${vote_average}</span>
                </div>
                <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>
        `
        main.appendChild(movieEl);
    });
};


//Vote average color
function voteColor(vote) {
    if(vote >= 8) {
        return 'green';
    }else if(vote >= 5){
        return 'orange'
    }else {
        return 'red';
    }
}


//Search Movies
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    // console.log(searchTerm)

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    }else {
        window.location.reload();
    }
});

