// IMPORT PACKAGES
// Here you should import the required packages for your Express app: `express` and `morgan`
const express = require("express");
const logger = require("morgan");
const path = require("path");
const fs = require("fs");


const port = 5005;

// CREATE EXPRESS APP
// Here you should create your Express app:

const app = express();


// MIDDLEWARE
// Here you should set up the required middleware:
// - `express.static()` to serve static files from the `public` folder
// - `express.json()` to parse incoming requests with JSON payloads
// - `morgan` logger to log all incoming requests
app.use(express.static("public"));
app.use(express.json());
app.use(logger("dev"));


// ROUTES
// Start defining your routes here:

app.get('/', (req, res) => {
	const homePage = path.join(__dirname, "views", "home.html");
	res.sendFile(homePage);
});

app.get('/blog', (req, res) => {
	const blogPage = path.join(__dirname, "views", "blog.html");
	res.sendFile(blogPage);
});
app.get('/api/projects', (req, res) => {
	const projectsFile = path.join(__dirname, "data", "projects.json");
	fs.readFile(projectsFile, 'utf8', (err, data) => {
		if (err) {
			res.status(500).send('Error reading projects file');
			return;
		}
		res.json(JSON.parse(data));
	});
});
app.get('/api/articles', (req, res) => {
	const articlesFile = path.join(__dirname, "data", "articles.json");
	fs.readFile(articlesFile, 'utf8', (err, data) => {
		if (err) {
			res.status(500).send('Error reading projects file');
			return;
		}
		res.json(JSON.parse(data));
	});
});

app.get("/*", (req, res) => {
	const notFoundPage = path.join(__dirname, "views", "not-found.html");
	res.sendFile(notFoundPage);
})
/* app.post('/', (req, res) => {
	console.log(req.body.name)
	res.end();
}) */

// START THE SERVER
// Make your Express server listen on port 5005:
app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})