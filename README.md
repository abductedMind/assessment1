# Assessment 1

For this assessment I decided to use **Nx** to scaffold the apps since I generally use Nx for all my projects.

**Note:** Currently the apps `api`, `task1-e2e`, and `task2-e2e` are unused, I left them in given these are typically a part of 
actual application project repos that I work on.

## Task 1

Scaffolded React/Tailwindcss/Vite without routing. e2e testing app was scaffolded but currently is unused.

### Running Task 1 locally

Node.js must be installed before running the `task1` app.

1. `pnpm i`
2. `nx serve task2`
3.  Navigate to http://localhost:4201

## Task 2

Removed Tailwindcss so Bootstrap might be used.

### Run task2 locally

Run `task2` locally (requires recent version of node.js).

1. `pnpm i`
2. `nx serve task2`
3.  Navigate to http://localhost:4202

### task2, served by node.js

Copied task1, removed Tailwindcss, and manually added Bootstrap.

**Note:** There is a requirement to use node.js as the server, but this is trivially easy considering that 
most scaffolding tools set you up to use Node.js to serve apps locally. I created an 
example Docker container that uses Node.js to serve the app in attempt to meet the requirement. 
Unlike my Docker example, in a production environment the port would likely be 80.

**Comment:** If a website is static without business logic run on the server, one might simply serve the files from an AWS S3 bucket or simple Apache configuration, rather than involve Node.js.
If you have an api that runs on Node.js you would likely not want to serve the website from the same resource running the api.

#### Steps to run `task2` in docker container

Within an environment that runs docker containers (such as Docker for Windows, or as I have previously used AWS Elastic Container Service).

1. `pnpm i`
2. `nx build task2`
3. `docker build -t task2 .`
4. `docker run -p 3000:3000 task2`

## Assessment feedback

- **themoviedb.apiary.io** website has been updated and the links provided are now broken
  - https://developer.themoviedb.org/reference/search-movie
  - https://developer.themoviedb.org/reference/movie-now-playing-list
- You have to sign up to see the documentation on how to use the api key
  - Using the query param `api_key` was a guess on my part
- There is no recommendation on **AI** usage, perhaps this is OK, I chose to use my traditional web references without AI
- Node.js knowledge is only indirectly tested in this assessment, which gives me the feeling that I did something wrong? Perhaps not.
- "Use Node.js for your server" could mean many things, so I chose to create a Docker example that uses the Node.js package "serve" 
- AJAX is specified as the required api calling mechanism, however `XMLHttpRequest` has generally been replaced by the `fetch` api, so I chose to use `fetch`
- "Search by title" is not an available feature on themoviedb, rather on the frontend (fuzzy search over all string props is what they provide)
  To search by title for real, one might download all results rather than just one page, then filter by the `original_title`
