let SliderMovie = [];
let kgf2 =
  "https://moviegalleri.net/wp-content/uploads/2019/12/Hero-Yash-KGF-Chapter-2-First-Look-Poster-HD.jpg";
let ro =
  "https://entertain.mercenie.com/wp-content/uploads/sites/7/2018/10/2.0-Official-Teaser-hd-video.jpg";
let brah =
  "https://i2.cinestaan.com/image-bank/1500-1500/147001-148000/147035.jpg";
let av =
  "https://images.hdqwalls.com/download/avengers-infinity-war-hd-poster-vp-1920x1200.jpg";

SliderMovie.push(kgf2, ro, brah, av);
var index = 1;
function slider() {
  var img = document.getElementById("imgSlide");
  img.src = SliderMovie[index];

  index++;
  if (index >= SliderMovie.length) {
    index = 0;
  }
}
setInterval(slider, 3000);

async function searchMovies() {
  try {
    let name = document.getElementById("query").value;
    let url = `https://www.omdbapi.com/?s=${name}&apikey=a050934e`;
    let res = await fetch(url);
    let data = await res.json();
    document.getElementById("imgSlide").style.display = "none";
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  try {
    let data = await searchMovies();
    if (data.Response === "false") {
      return false;
    }
    display(data.Search);
    let main = document.getElementById("content");
    main.style.display = "flex";
  } catch (err) {
    console.log(err);
  }
}

let timerId;
function debounce(func, delay) {
  if (timerId) {
    clearTimeout(timerId);
    let main = document.getElementById("content");
    main.style.display = "none";
  }

  timerId = setTimeout(function () {
    func();
  }, delay);
}

function display(movieList) {
  if (!movieList) return;
  document.getElementById("result").innerHTML = "";

  movieList.map(function (ele) {
    let div = document.createElement("div");
    div.setAttribute("id", "resultDiv");
    div.style.backgroundColor = "black";
    div.style.color = "white";

    let img = document.createElement("img");
    img.setAttribute("id", "contentImg");
    img.src = ele.Poster;

    let anotherDiv = document.createElement("div");
    anotherDiv.setAttribute("id", "anotherDiv");
    let h3 = document.createElement("h3");
    h3.style.color = "white";
    h3.innerText = ele.Title;

    let h4 = document.createElement("h4");
    h4.innerText = "Date Of Release : " + ele.Year;

    var hr = document.createElement("hr");
    anotherDiv.append(h3, h4);

    div.append(img, anotherDiv);
    div.addEventListener("click", function () {
      getData(ele.Title);
    });
    document.getElementById("result").append(div, hr);
  });
}

async function getData(title) {
  try {
    let res = await fetch(
      `https://www.omdbapi.com/?t=${title}&apikey=a050934e`
    );
    let res2 = await res.json();
    localStorage.setItem("movieData", JSON.stringify(res2));
    window.open("movie.html", "_self");
  } catch (err) {
    console.log(err);
  }
}
