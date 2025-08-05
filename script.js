const apiKey = "7b3aad61eb2554ed8642eb71a17da4ce";
const genreIds = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

async function createHTML(rawData) {
    const jsonData = await rawData.json()
    const movieData = jsonData?.results
    const movies = movieData.map(movie => ({
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, 
      title: movie.title, 
      genre: movie.genre_ids.map(id => genreIds[id]).join(", "), 
      overview: movie.overview,
      releaseDate: movie.release_date,
      averageVote: movie.vote_average.toFixed(1),
      voteCount: movie.vote_count
    }));

    const body = document.body
    body.style.overflowY = "scroll"
    const container = document.querySelector(".movie-result");
    container.innerHTML = ""

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const img = document.createElement("img");
        img.className = "movie-poster"
        img.src = movie.poster;

        const title = document.createElement("h2");
        title.className = "movie-name-title"
        title.textContent = movie.title; 

        const details = document.createElement("details");
        details.className = "movie-details";

        const movieDisplayInfo = document.createElement("div");
        movieDisplayInfo.className = "movie-display-info";

        const ul = document.createElement("ul");
        ul.className = "movie-info";

        const genreLi = document.createElement("li");
        genreLi.className = "details-list-item";
        genreLi.innerHTML = `Genre(s): <strong>${movie.genre}</strong>`;
        ul.appendChild(genreLi);    
        const overviewLi = document.createElement("li");
        overviewLi.className = "details-list-item";
        overviewLi.innerHTML = `Overview:<br/><i>"${movie.overview}"</i>`;
        ul.appendChild(overviewLi);
        const dateLi = document.createElement("li");
        dateLi.className = "details-list-item";
        dateLi.innerHTML = `Release Date: <strong>${movie.releaseDate}</strong>`;
        ul.appendChild(dateLi);
        const voteLi = document.createElement("li");
        voteLi.className = "details-list-item";
        voteLi.innerHTML = `Average Vote: <strong>${movie.averageVote}/10</strong>`;
        ul.appendChild(voteLi);
        const countLi = document.createElement("li");
        countLi.className = "details-list-item";
        countLi.innerHTML = `Vote Count: <strong>${movie.voteCount}</strong> person(s)`;
        ul.appendChild(countLi);

        details.appendChild(ul);
        movieDisplayInfo.appendChild(title)
        movieDisplayInfo.appendChild(details);

        card.appendChild(img);
        card.appendChild(movieDisplayInfo);

        container.appendChild(card);
    });
}

async function fetchMovieJsonByGenre() {
    const genreSelect = document.querySelector(".movie-genre-input")
    const genreValue = genreSelect.value
    const rawData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreValue}`);
    createHTML(rawData);
}

async function fetchMovieJsonByTitle() {
    const titleInput = document.querySelector(".movie-title-input")
    const titleValue = titleInput.value
    const rawData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titleValue}`);
    createHTML(rawData);
}