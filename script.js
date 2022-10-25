"use strict"

const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHURL = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.querySelector("input");
const span = document.querySelector("span");


// uzkrauna populiarius filmus
fetch(APIURL)
.then(response => response.json())
.then(appendMoevieData)
.catch(error => console.log(error))


// uzkrauna filmus pagal search raktazodi
form.addEventListener("submit", function(e) {
    e.preventDefault()

    // jeigu input tuscias nieko negrazina
    if(!search.value) return
    
    // isvalo innethtml
    main.innerHTML = ""

    let searchTerm = search.value
    span.innerHTML = searchTerm

    fetch(SEARCHURL + searchTerm)
    .then(response => response.json())
    .then(appendMoevieData)
    .catch(error => console.log(error))
})

function appendMoevieData(data){
    const results = data.results
    results.map(x => {
        let createMovie = document.createElement("div")
        createMovie.classList.add("movie")
        createMovie.innerHTML = 
        `
            <img src="${IMGPATH + x.poster_path}" alt="${x.original_title}">
            <div class="movie-info">
                <h3>${x.original_title}</h3>
                <span class="green">${x.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                <p>${x.overview}</p>
            </div>

        `
    let ratingColor = createMovie.querySelector("span") 
    if(x.vote_average >= 8) {
       ratingColor.style.color = "green"
    } else if (x.vote_average >= 5) {
        ratingColor.style.color = "orange"
    } else {
         ratingColor.style.color = "red"
    }
        main.append(createMovie)


    })
    

    // console.log(results[0].poster_path)
    console.log(results)
    

}
