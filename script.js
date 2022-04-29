const searchForm = document.querySelector(".search-bar");
const input = document.querySelector(".input");
const newsList = document.querySelector(".output");
const resultNode = document.getElementById("result");

// searchForm.addEventListener('submit', retrieve)

const news = {
  apiKey: "098bc3cb28df4cf8bfe2648005b3a23c",
  fetchNews: function (article) {
    fetch(
      "https://newsapi.org/v2/everything?q=" +
        article +
        "&from=2022-04-24&sortBy=popularity&apiKey=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayNews(data));
  },
  displayNews: function (data) {
    const { articles } = data;
    const urls = articles.map((article) => article.url);
    resultNode.innerHTML = "";
    urls.forEach((url) => {
      const a = document.createElement("a");
      a.href = url;
      a.innerText = url;
      resultNode.appendChild(a);
      resultNode.appendChild(document.createElement("br"));
      resultNode.appendChild(document.createElement("br"));
    });
    console.log(urls);
  },

  search: function () {
    if (searchForm.value == "") {
      document.getElementById("error-paragraph").innerText =
        "Please Enter Something";
      setTimeout(() => {
        document.getElementById("error-paragraph").innerText = "";
      }, 1000);
    } else {
      this.fetchNews(searchForm.value);
    }
  },
};

document.querySelector(".btn").addEventListener("click", () => {
  news.search();
});

document.querySelector(".search").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    news.search();
  }
});
