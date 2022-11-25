const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
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

//deletes a dog from dog array as well as from the owner"s dog array :'(
//accepts the owner id in thew params + the dog Id in the body
const deleteDog = async (req, res) => {
  const userId = req.param;
  const dogId = { ...req.body };
  console.log(dogId);
  try {
    await client.connect();
    const db = client.db(dbName);
    const deleteDogFromDogs = await db
      .collection(dogsCollection)
      .deleteOne({ _id: dogId._id });
    const deleteDogFromOwner = await db
      .collection(userCollection)
      .updateOne({ _id: userId }, { $pull: { dogs: dogId._id } });

    res.status(200).json({
      status: 200,
      message: { dog: deleteDogFromDogs, user: deleteDogFromOwner },
    });
  } catch (err) {
    res.status(403).json({ status: 403, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { deleteDog };
