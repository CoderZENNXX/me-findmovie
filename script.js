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

async function fetchMovieJsonByGenre() {
    const body = document.body
    body.style.overflow = "scroll"

    const genreSelect = document.querySelector(".movie-genre-input")
    const genreValue = genreSelect.value

    const rawData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreValue}`);
    const jsonData = await rawData.json()
    const movieData = jsonData?.results

    const movies = movieData.map(movie => ({poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, title: movie.title, genre: movie.genre_ids.map(id => genreIds[id]).join(", ") }));

    const container = document.querySelector(".movie-result");
    container.innerHTML = ""

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const img = document.createElement("img");
        img.className = "movie-poster"
        img.src = movie.poster;

        const title = document.createElement("h2");
        title.className = "movie-title"
        title.textContent = movie.title; 

        const details = document.createElement("details");
        details.className = "movie-details";

        const summary = document.createElement("summary");
        summary.className = "movie-summary";

        const summaryP = document.createElement("p");
        summaryP.textContent = movie.summary;
        summary.appendChild(summaryP);

        const ul = document.createElement("ul");
        ul.className = "movie-info";

        const li = document.createElement("li");
        li.textContent = movie.genre;
        ul.appendChild(li);    

        details.appendChild(summary);
        details.appendChild(ul);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(details);

        container.appendChild(card);
    });
}