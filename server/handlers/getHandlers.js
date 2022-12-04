const { MongoClient } = require("mongodb");
const { json } = require("stream/consumers");
require("dotenv").config();
const {
  MONGO_URI,
  dbName,
  dogParksCollection,
  userCollection,
  dogsCollection,
  breedsCollection,
} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const getAllBreeds = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const breeds = await db.collection(breedsCollection).find().toArray();
    breeds
      ? res.status(200).json({ status: 200, data: breeds })
      : res.status(403).json({ message: err.message });
  } catch (err) {
    res.status(404).json({ message: err.message });
  } finally {
    client.close();
  }
};

const getOneUserNoDogs = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection(userCollection).findOne({ _id: userId });
    user
      ? res.status(200).json({ status: 200, user: user })
      : res.status(404).json("user not found");
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  } finally {
    client.close();
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection(userCollection).findOne({ email: email });

    if (user) {
      const userDogs = await db
        .collection(dogsCollection)
        .find({ _id: { $in: user.dogs } })
        .toArray();
      res.status(200).json({ status: 200, user: user, dogs: userDogs });
    } else {
      res.status(206).json({ status: 206, mustCreateProfile: true });
    }
  } catch (err) {
    res.status(403).json({ status: 403, message: err.message });
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};

const getOneUserWithDogs = async (req, res) => {
  const { userId } = req.params;
  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection(userCollection).findOne({ _id: userId });
    if (!user) {
      throw new Error("no user found");
    }
    const userDogs = await db
      .collection(dogsCollection)
      .find({ _id: { $in: user.dogs } })
      .toArray();
    if (userDogs.length === 0) {
      throw new Error("this user has no dogs");
    }
    res
      .status(200)
      .json({ status: 200, data: { user: user, userDogs: userDogs } });
  } catch (err) {
    res.status(403).json({ status: 403, message: err.message });
  } finally {
    client.close();
  }
};

const getAllParks = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const allParks = await db.collection(dogParksCollection).find().toArray();
    allParks.length > 0
      ? res.status(200).json({
          status: 200,
          message: allParks,
        })
      : res.status(404).json({
          status: 404,
          message: "couldnt get the parks",
        });
  } catch (err) {
    res.status(454).json({
      status: 454,
      message: err.message,
    });
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};

const getAllDogs = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const dogs = await db.collection(dogsCollection).find().toArray();
    dogs
      ? res.status(200).json({ status: 200, dogs: dogs })
      : res.status(404).json({ status: 400, message: "no dosg found :(" });
  } catch (err) {
    res.status(403).json({ status: 403, message: err.message });
  } finally {
    client.close();
  }
};

const getOneDog = async (req, res) => {
  const dogId = req.params;
  try {
    await client.connect();
    const db = client.db(dbName);
    const dog = await db.collection(dogsCollection).findOne({ _id: dogId });
    dog
      ? res.status(200).json({ status: 200, dog: dog })
      : res.status(404).json({ status: 404, message: "dog not found" });
  } catch (err) {
    res.status(200).json({ message: err.message });
  } finally {
    client.close();
  }
};
//GET one park onlybased on parkId in params without details
const getParkNoDetails = async (req, res) => {
  const { parkId } = req.params;
  console.log(parkId);
  try {
    await client.connect();
    const db = client.db(dbName);
    //find the park
    const park = await db
      .collection(dogParksCollection)
      .findOne({ _id: parkId });
    if (!park) {
      throw new Error("no park found");
    }
    res.status(200).json({ status: 200, park: park });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};
//I might delete this one and slice/filter the allPark one instead depending on the query.

//GET one park only based on park Id in params with details
const getParkWithDetails = async (req, res) => {
  const { parkId } = req.params;
  try {
    await client.connect();
    const db = client.db(dbName);
    //find the park
    const park = await db
      .collection(dogParksCollection)
      .findOne({ _id: parkId });
    if (!park) {
      throw new Error("no park found");
    }
    // loop over the park.dogs array to get all the dogs infos and place them in an array
    const infos = await db
      .collection(dogsCollection)
      .find({ _id: { $in: park.dogs } })
      .toArray();
    // if (infos.length === 0) {
    //   throw new Error("no dogs in that park");
    // }
    //create the var for the details
    let weightArr = [];
    let totalWeight = 0;
    let heightArr = [];
    let totalHeight = 0;
    let neuteredArr = [];
    let breedArr = [];
    //deconstruct the data for each categories
    infos.forEach((dog) => {
      if (dog.weight) {
        weightArr.push(dog.weight);
        totalWeight += +dog.weight;
      }
      if (dog.height) {
        heightArr.push(dog.height);
        totalHeight += +dog.height;
      }
      if (dog.neutered) {
        neuteredArr.push(dog.neutered);
      }
      if (dog.breed) {
        breedArr.push(dog.breed);
      }
    });
    //function to sort the breeds by the most common in the park
    let cleanArr = {};
    for (const breed of breedArr) {
      let keys = breed;
      cleanArr[keys] = ++cleanArr[breed] || 1;
    }

    const parkDetails = {
      averageWeight: Math.floor(+totalWeight / +weightArr.length + 1),
      averageHeight: Math.floor(+totalHeight / +heightArr.length + 1),
      neuteredRatio: Math.floor(
        ((+neuteredArr.length + 1) / (+infos.length + 1)) * 100
      ),
      mostCommonBreeds: Object.entries(cleanArr),
    };

    res.status(200).json({ status: 200, data: park, details: parkDetails });
  } catch (err) {
    res.status(403).json({ status: 403, message: err.message });
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};

module.exports = {
  getAllParks,
  getParkWithDetails,
  getOneDog,
  getOneUserNoDogs,
  getOneUserWithDogs,
  getAllDogs,
  getUserByEmail,
  getAllBreeds,
  getParkNoDetails,
};
