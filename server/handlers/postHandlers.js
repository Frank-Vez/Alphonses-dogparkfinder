const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const {
  MONGO_URI,
  dbName,
  dogParksCollection,
  userCollection,
  dogsCollection,
  propositionCollection,
} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

//this handles add a new user with one dog
//I might comeback later to make it so that he can add any number of dog at a time --but more dangerous than anything really.
//it accepts as a body:
//body:{
//user:{"first_name":"Isadora","last_name":"Erasmus","email":"ierasmus0@ucoz.ru","address:" "123 street, montreal , qc, ca","dogs":null}
//dog{{"name":"Yú","weight":137,"height":140,"picture":"https://robohash.org/voluptateremvoluptates.png?size=50x50&set=set1","neutered":false, "breed":"American Bully"},
//}

const addNewUser = async (req, res) => {
  const userId = uuidv4();
  const dogId = uuidv4();
  const user = { ...req.body.user, dogs: [dogId], _id: userId };
  const dog = { ...req.body.dog, owner: userId, _id: dogId };
  try {
    await client.connect();
    const db = client.db(dbName);
    const newUSer = await db.collection(userCollection).insertOne(user);
    const newDog = await db.collection(dogsCollection).insertOne(dog);

    res.status(200).json({
      status: 200,
      newUser: newUSer,
      newDog: newDog,
    });
  } catch (err) {
    res.status(403).json(err.message);
  } finally {
    client.close();
  }
};

const proposeAPark = async (req, res) => {
  const propositionId = uuidv4();
  const parkProposition = req.body;
  console.log(parkProposition);
  try {
    await client.connect();
    const db = client.db(dbName);
    const newProposition = await db
      .collection(propositionCollection)
      .insertOne({ _id: propositionId, ...parkProposition });
    res
      .status(200)
      .json({ status: 200, message: "park proposed!", data: newProposition });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { addNewUser, proposeAPark };
