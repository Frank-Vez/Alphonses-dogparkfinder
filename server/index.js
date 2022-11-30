const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { deleteDog } = require("./handlers/deleteHandlers");
const {
  getAllParks,
  getParkWithDetails,
  getOneDog,
  getOneUserNoDogs,
  getOneUserWithDogs,
  getAllDogs,
  getUserByEmail,
  getAllBreeds,
} = require("./handlers/getHandlers");
const {
  addNewDog,
  addFavoritePark,
  addNewComment,
  modifyComment,
  deleteComment,
} = require("./handlers/patchHandlers");
const { addNewUser } = require("./handlers/postHandlers");
const port = 8000;

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  //test endpoint
  .get("/", (req, res) => {
    res.status(200).json("Hello World!");
  })
  //get all breeds
  .get("/API/getAllBreeds", getAllBreeds)
  //get all the parks
  .get("/API/getAllParks", getAllParks)
  //GET one park
  .get("/API/parks/:parkId", getParkWithDetails)
  //GET one dog
  .get("/API/dogs/:dogId", getOneDog)
  //GET all dogs
  .get("/API/getAllDogs", getAllDogs)
  //GET one user without the dogs
  .get("/API/users/:userId", getOneUserNoDogs)
  //GET one user with the dogs!
  .get("/API/users/:userId/dogs", getOneUserWithDogs)
  //GET one user by its email
  .get("/API/currentUser/:email", getUserByEmail)

  //POST a new user with a dog
  .post("/API/addNewUser", addNewUser)

  //PATCH a new dog in a user and adds it to dog array
  .patch("/API/user/:userId/addADog", addNewDog)
  //PATCH dog to their favorite park, add thie park id to the user's favorite park
  .patch("/API/parks/:parkId/favorite", addFavoritePark)
  //PATCH a new comment to a park
  .patch("/API/parks/:parkId/comment", addNewComment)
  //PATCH modify a comment on a park
  .patch("/API/parks/:parkId/modifyComment", modifyComment)
  //PATCH delete a comment on a park
  .patch("/API/parks/:parkId/deleteComment", deleteComment)

  //DELETE a dog from owner's arr + dogs arr
  .delete("/API/user/:userID/removeDog", deleteDog)

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
