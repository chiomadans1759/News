const articleId = window.location.search.split("=")[1];



function getArticlesByID() {
	let request = new XMLHttpRequest();
	request.open("GET", `http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news/${articleId}`, true);
	request.onload = function fetchSingleArticle() {
		let article = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			const bannerImage = document.querySelector("#banner");
			const title = document.querySelector("#title");
			const body = document.querySelector("#body");

			title.textContent = article.title;
			body.textContent = article.url;
			body.setAttribute("href", article.url);
			bannerImage.setAttribute("src", article.avatar);
		}
	};
	request.send();
}
getArticlesByID();

