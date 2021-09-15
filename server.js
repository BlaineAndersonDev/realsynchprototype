// Express is what allows our backend to receieve 'HTTP calls' from other sources, specifically our frontend.
// https://expressjs.com/
import express from 'express';
// Path allows our Server to find build files stored in our frontend.
// https://nodejs.org/api/path.html
import path from 'path';

// We create our "App" using express.
const app = express();
// Allows the Server to take requests on the given `port`. When no port is provided, it will default to 3001.
const port = process.env.PORT || 3001;

// This line tells our app to use files in the Client's 'build' folder when rendering static pages (production pages).
app.use(express.static(path.join(__dirname, 'client/build')));

// All API endpoints (routes) should begin with '/api'.
// Loading 'localhost:3001/api/example' will direct you to this '/api/example' route.
app.get('/api/messages', (req, res) => {
  // Here we create a variable named 'helloWorld' that holds an object.
  const helloWorld = [
    {id: 1, message: 'Hello World!'},
    {id: 2, message: 'This is pretty cool.'},
    {id: 3, message: 'You got this working!'},
    {id: 4, message: 'Amazing job!'}
  ]
  // We return the object in JSON to the calling point (Our browser).
  res.json(helloWorld)
});

// Loading 'localhost:3001/api/' will direct you to this root '/api' route.
app.get('/api', (req, res) => {
  const message = 'This is the root API route!';
  res.json(message)
});

// This is a catchall route to prevent the user from dealing with errors from visiting routes that do not exist. It sends a 404 (Not Found) Status as well as a message.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Prompt text on termial view to show API is ready to go.
app.listen(port);
console.log(`Server listening on ${port}`);

// Exports the `Express App` to be used elsewhere in the project.
module.exports = app;