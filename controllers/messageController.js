import express from 'express';
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

router.post('/create', async (req, res) => {
  console.log(' >>> Entered Route POST(Create) `/api/messages/create`')

  // First we want to get all the id's from the objects in 'helloWorld' array in order to make a new object to add to it.
  let listOfIds = [];
  helloWorld.map(i => listOfIds.push(i.id))

  // Now that 'Delete' is in play we need to make sure we check the edge case "If the user deleted ALL messages".
  let currentHighestNumber;
  if (listOfIds.length <= 0) {
    currentHighestNumber = 0
  } else {
    // Now we make our 'id' 1 highers than the highest number in the array.
    // (Note: We dont care if we reuse numbers since the App won't remember anything upon restart anyway).
    currentHighestNumber = Math.max(...listOfIds)
  }

  // Now that we have the currentHighestNumber & our message, we can create an Object.
  const createResults = {id: (currentHighestNumber + 1), message: req.query.message }

  // Here we push the new object into the 'helloWorld' array.
  helloWorld.push(createResults)

  // Currently, we only want to return a HTTP StatusCode & a message as the messageDisplay list will automatically be updated by the frontend.
  res.status(200).send('Message Created.');
});

router.put('/update/:id', async (req, res) => {
  console.log(' >>> Entered Route PUT(Update) `/api/messages/update/:id`')

  // First let's identify the exact 'id' so we know what message to update.
  // We also need to convert it to an integer (because its currently a string).
  const messageId = Number(req.params.id);

  // Let's also identify the 'message' so we can apply it later.
  const messageText = req.query.messageText;

  // Now we will iterate over the 'helloWorld' array until we find the provided 'messageId'.
  for (let i in helloWorld) {
    if (helloWorld[i].id == messageId) {
      helloWorld[i]['message'] = messageText
    }
  }

  // Currently, we only want to return a HTTP StatusCode & a message as the messageDisplay list will automatically be updated by the frontend.
  res.status(200).send('Message Updated.');
});

router.delete('/delete/:id', async (req, res) => {
  console.log(' >>> Entered Route DELETE(Delete) `/api/messages/delete`')

  // First let's identify the exact 'id' so we know what message to delete.
  // We also need to convert it to an integer (because its currently a string).
  const messageId = Number(req.params.id);

  // Now we will iterate over the 'helloWorld' array until we find the provided 'messageId'.
  for (let i in helloWorld) {
    if (helloWorld[i].id == messageId) {
      // When we find the correct 'id', we will then remove it.
      helloWorld.splice(i, 1);
    }
  }

  // Currently, we only want to return a HTTP StatusCode & a message as the messageDisplay list will automatically be updated by the frontend.
  res.status(200).send('Message Deleted.');
});

// Here we export the 'router', which contains all of our routes listed, to our server.js file for use.
module.exports = router