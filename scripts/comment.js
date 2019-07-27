const newsId = window.location.search.split("=")[1];


function getArticlesByID() {
	let request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news/${newsId}`,
    true
  );
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
getComments();

document.querySelector("#add-comment").addEventListener("click", postComment);
function postComment() {
  let comment = document.querySelector("input").value;

  fetch(
    `http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news/${newsId}/comments`,
    {
      method: "POST",
      body: JSON.stringify({
        comment,
        newsId,
        name: "Chioma Okpala",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/dimaposnyy/128.jpg"
      })
    }
  )
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function getComments() {
	let request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news/${newsId}/comments`,
    true
  );
  request.onload = function fetchComments() {
    let comments = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      const commentContainer = document.querySelector(".comments");
      comments.forEach(comment => {
        const newCommentCard = createCommentsCard(comment);
        commentContainer.appendChild(newCommentCard);
      });
    }
  };
  request.send();
}

function createCommentsCard(commentDetails) {
  const commentWrap = document.createElement("DIV");
  const avatarImage = document.createElement("IMG");
  const p = document.createElement("P");
  const i = document.createElement("I");
  const comment = document.createElement("INPUT");
  const b = document.createElement("B");
  const edit = document.createElement("SPAN");
  const Delete = document.createElement("SPAN");

  commentWrap.classList.add("commented");
  comment.classList.add("comment-body");
	edit.classList.add("edit");
	edit.addEventListener("click", editComment);
	edit.setAttribute("id", commentDetails.id);
  Delete.classList.add("delete");
  Delete.addEventListener("click", deleteComment);
	Delete.setAttribute("id", commentDetails.id);
	commentWrap.setAttribute("id", 'comment-' +commentDetails.id);

  commentWrap.appendChild(avatarImage);
  commentWrap.appendChild(p);
  p.appendChild(i);
  p.appendChild(comment);
  p.appendChild(b);
  b.appendChild(edit);
  b.appendChild(Delete);

  avatarImage.setAttribute("src", commentDetails.avatar);
  i.textContent = commentDetails.createdAt; 
	comment.setAttribute("value", commentDetails.comment);
  edit.textContent = "Edit";
  Delete.textContent = "Delete";

  return commentWrap;
}

function deleteComment(e) {
	let commentId = e.srcElement.id;
  fetch(`http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news/${newsId}/comments/${commentId}`,
    {
      method: "DELETE"
		}
  )
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function editComment(e) {
	let commentId = e.srcElement.id;
	let commentWrap = document.querySelector("#comment-"+commentId)
	let comment = commentWrap.querySelector(".comment-body").value;
	console.log(comment)
	

	fetch(`http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news/${newsId}/comments/${commentId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        comment
      })
    }
  )
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
