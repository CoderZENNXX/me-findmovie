const apiKey = "c2427678";
const genre = "horror";
const generalSearchTerm = "  "

async function fetchMovieJson() {
    const rawData = await fetch(`https://www.omdbapi.com/?s=${generalSearchTerm}&type=movie&page=1&apikey=${apiKey}`);
    const jsonData = await rawData.json()

    console.log(jsonData)
}