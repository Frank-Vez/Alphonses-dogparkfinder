const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const { json } = require("stream/consumers");
const {
  MONGO_URI,
  dbName,
  dogParksCollection,
  userCollection,
  dogsCollection,
} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

//adds a new dog to the dogs collection from a user's profile.
//also adds that dogs ID to the users's profile dogs array -> thats why its a patch
//accepts a body with this structure: //dog{{"name":"Yú","weight":137,"height":140,"picture":"https://robohash.org/voluptateremvoluptates.png?size=50x50&set=set1","neutered":false, "breed":"American Bully"},
// and a param with the user{_id: "c275297c-de6c-4ace-a5b2-11f52d8536b4"}
const addNewDog = async (req, res) => {
  const dogId = uuidv4();
  const { userId } = req.params;
  const dog = { ...req.body, _id: dogId, owner: userId };
  console.log(userId);
  console.log(dog);
  try {
    await client.connect();
    const db = client.db(dbName);
    const newDog = await db.collection(dogsCollection).insertOne(dog);
    const addDogToUser = await db
      .collection(userCollection)
      .updateOne({ _id: userId }, { $push: { dogs: dogId } });

    res.status(200).json({
      status: 200,
      data: {
        newDog: newDog,
        user: addDogToUser,
      },
    });
  } catch (err) {
    res.status(403).json({ message: err.message });
  } finally {
    client.close();
  }
};

//adds a parkId to a user + has a favoritepark : true
//adds all user's dogs Id to a park
//accepts the park ID in the params
//the user and its dogs array in the body
const addFavoritePark = async (req, res) => {
  const { parkId } = req.params;
  const dogArr = req.body.dogs;
  const userId = req.body.user;
  const oldPark = req.body.oldPark;
  console.log("oldpark", oldPark);
  console.log("dogs", dogArr);
  console.log(parkId);
  try {
    await client.connect();
    const db = client.db(dbName);
    const trueFavorite = await db
      .collection(userCollection)
      .updateOne({ _id: userId }, { $set: { hasAFavorite: true } });
    const removeParkToOwner = await db
      .collection(userCollection)
      .updateOne({ _id: userId }, { $pull: { favoritePark: oldPark } });
    const addParkToOwner = await db
      .collection(userCollection)
      .updateOne({ _id: userId }, { $push: { favoritePark: parkId } });
    const addDogToPark = await db
      .collection(dogParksCollection)
      .updateOne({ _id: parkId }, { $push: { dogs: { $each: dogArr } } });

    res.status(200).json({
      status: 200,
      data: {
        favoritePark: addParkToOwner,
        dogs: addDogToPark,
        oldpark: removeParkToOwner,
      },
    });
  } catch (err) {
    res.status(403).json({ message: err.message });
  } finally {
    client.close();
  }
};

//adds a new comment to a park. accepts the park ID in params + the userID and the comment in body
const addNewComment = async (req, res) => {
  const { parkId } = req.params;
  console.log(parkId);
  const { user, comment } = req.body;
  const time = moment().format("lll");
  const commentId = uuidv4();
  const newComment = {
    park: parkId,
    comment: comment,
    author: user,
    commentId: commentId,
    time: time,
  };
  try {
    await client.connect();
    const db = client.db(dbName);
    const parkComment = await db
      .collection(dogParksCollection)
      .updateOne({ _id: parkId }, { $push: { comments: newComment } });
    res.status(200).json({ status: 200, message: parkComment });
  } catch (err) {
    res.status(403).json({ status: 403, message: err.message });
  } finally {
    client.close();
  }
};

// modify a comment, needs the comments ID, a new comment, park id in params
const modifyComment = async (req, res) => {
  const { parkId } = req.params;
  const { commentId, user, comment } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName);
    //ADD A SECOND QUERY WITH THE USER ID TO VERIFY THAT THE USEER MODIFYING THE COMMENT IS THE ONE THAT WROTE IT
    const newComment = await db.collection(dogParksCollection).updateOne(
      { _id: parkId, "comments.commentId": commentId },
      {
        $set: {
          "comments.$.comment": comment,
          "comments.$.timeModified": moment().format("lll"),
        },
      }
    );
    res.status(200).json({ status: 200, data: newComment });
  } catch (err) {
    res.status(403).json({ status: 403, message: err.message });
  } finally {
    client.close();
  }
};

const deleteComment = async (req, res) => {
  const { parkId } = req.params;
  const { commentId } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName);
    const deletedComment = await db
      .collection(dogParksCollection)
      .updateOne(
        { _id: parkId },
        { $pull: { comments: { commentId: commentId } } }
      );
    res.status(200).json({ status: 200, message: deletedComment });
  } catch (err) {
    res.status(403).json({ status: 403, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  addNewDog,
  addFavoritePark,
  addNewComment,
  modifyComment,
  deleteComment,
};
