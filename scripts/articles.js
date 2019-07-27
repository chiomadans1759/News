getArticles();

let currentPage = 1;
let isOnLastPage = false;
const previous = document.getElementById("previous");
const next = document.getElementById("next");

previous.addEventListener("click", function() {
  if (currentPage > 1) currentPage--;
  if (currentPage > 0) getArticles(currentPage);
});

next.addEventListener("click", function() {
  if (!isOnLastPage) {
    currentPage++;
    getArticles(currentPage);
  }
});

function getArticles(page = 1, limit = 10) {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news?page=${page}&limit=${limit}`,
    true
  );
  request.onload = function fetchArticles() {
    let articles = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      const articlesContainer = document.querySelector("article");
      if (articles.length > 0) {
        isOnLastPage = false;
        articlesContainer.innerHTML = "";
        articles.reverse().forEach(article => {
          const newArticleCard = createArticleCard(article);
          articlesContainer.appendChild(newArticleCard);
        });
      } else isOnLastPage = true;
    }
  };
  request.send();
}

function createArticleCard(articleDetails) {
  const articleWrap = document.createElement("DIV");
  const article = document.createElement("DIV");
  const image = document.createElement("IMG");
  const title = document.createElement("H3");
  const body = document.createElement("P");
  const metrics = document.createElement("DIV");
  const timeWrap = document.createElement("DIV");
  const readMore = document.createElement("A");
  const avartar = document.createElement("IMG");
  const time = document.createElement("SPAN");

  articleWrap.classList.add("article-wrap");
  article.classList.add("article");
  title.classList.add("article-title");
  body.classList.add("article-body");
  metrics.classList.add("metrics");
  timeWrap.classList.add("time");

  articleWrap.appendChild(article);
  articleWrap.appendChild(image);
  article.appendChild(title);
  article.appendChild(body);
  article.appendChild(metrics);
  metrics.appendChild(timeWrap);
  metrics.appendChild(readMore);
  timeWrap.appendChild(avartar);
  timeWrap.appendChild(time);

  title.textContent = articleDetails.title;
  body.textContent =
    "Those who hail from the seven states with two nominees each are: Osagie Ehanir who hail from the seven states with two nominees each are: Osagie Ehanir Those who hail from the seven states with two nominees each are: Osagie Ehanir";
  image.setAttribute("src", articleDetails.avatar);
  readMore.textContent = "Read More";
  readMore.setAttribute("href", "article.html?id=" + articleDetails.id);
  avartar.setAttribute("src", articleDetails.avatar);
  time.textContent = articleDetails.createdAt;

  return articleWrap;
}

document
  .querySelector("#create-news-button")
  .addEventListener("click", postNews);
function postNews() {
  let title = document.querySelector("#new-title").value;
  let url = document.querySelector("textarea").value;
  let avatar = document.querySelector("#new-image").value;

  fetch("http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news", {
    method: "POST",
    body: JSON.stringify({
      title
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

let eachNews = document.querySelector("#search-news");
eachNews.addEventListener("keyup", searchNews);

function searchNews() {
  let news = document.querySelectorAll(".article-wrap");
  let searchResult = document.querySelectorAll(".article-title");
  let searchVal = eachNews.value.toLowerCase();
  
  if(searchVal){
    for (let i = 0; i < news.length; i++) {
      if (searchResult[i].textContent.toLowerCase().indexOf(searchVal) > -1) {
        news[i].style["display"] = "flex";
      } else {
        news[i].style["display"] = "none";
      }
    }
  }else{
    news.forEach(n => {
      n.style['display'] = 'flex'
    })
  }
}
