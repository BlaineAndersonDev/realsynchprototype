import express from 'express';
// This 'router' is created and maintained by express. It will contain all of our routes listed below in a single, easily accessible object.
const router = require('express').Router();

// The object we will be manipulating (instead of using a DB).
const helloWorld = [
  {id: 1, message: 'Hello World!'},
  {id: 2, message: 'This is pretty cool.'},
  {id: 3, message: 'You got this working!'},
  {id: 4, message: 'Amazing job!'}
]

router.get('/', async (req, res) => {
  console.log(' >>> Entered Route GET(Read) `/api/messages/`')
  // Set 'readResults' as the object 'helloWorld'.
  const readResults = helloWorld
  // We return 'readResults' in JSON to the 'Message.js'.
  res.json(readResults)
});

// Here we export the 'router', which contains all of our routes listed, to our server.js file for use.
module.exports = router
