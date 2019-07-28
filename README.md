# News App
## General Overview
A simple news app to test my understanding of vanilla JavaScript
`http://news-interview-app.herokuapp.com`
 
## Getting Started

### Prerequisites to use this app
1. Any web browser (Preferably Chrome)
 

### Installation
1. Clone this repository into your local machine:
```e.g git clone https://github.com/chiomadans1759/news``` 

2. Open on a web browser 


 
## Features

 ### Required Features
 ``NEWS``
- [`GET`] Get paginated news [http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news?page=1&limit=10].
- [`POST`] Add news item [http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news].
- [`PUT`] Update a news item [http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news/:id].
- [`GET`] Get comments on a news[http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news/:id/comments].
- [`DELETE`] Deletes a single news[http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news/:id].

``COMMENTS``
- [`GET`] Get Comment on news [http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news/:id/comments]
- [`POST`] Add Comment to news [http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news/:id/comments].
- [`PUT`] Edit comment on a news[http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news/:id/comments/:id].
- [`DELETE`] Delete comment on news item [http(s)://5bee92827839000013e6faed.mockapi.io/clane/api/v2/news/:id/comments/:id].

``EXTRA``
- [`PAGINATION`] Paginate posts
- [`SEARCH`] Implement Search

## Author

- Oluchukwu Chioma Okpala
