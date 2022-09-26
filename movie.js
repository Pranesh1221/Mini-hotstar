function appendMovie() {
  let content = document.getElementById("MovieContent");
  let data = JSON.parse(localStorage.getItem("movieData")) || [];
  content.innerHTML = `
    <img src=${data.Poster} alt=""/>
    </hr>
    <hr>
    <div id="description">
     <h1>Movie Name :${data.Title}</h1>
     <h2>Year Of Release :${data.Released}</h2>
     <h3>IMDB Rating :${data.imdbRating}<i class="fa-solid fa-star"></i></h3>
     <p>${data.Actors}</p>
    </div>
`;
}

appendMovie();
