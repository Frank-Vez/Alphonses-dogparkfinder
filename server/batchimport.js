//This whole page is to export the dummy data into the MongoDB in the form that I need it

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI, dbName, dogParksCollection } = process.env;

const dogParks = require("./dummy data/dogParks");
//adds id to dogpark so that mongo wont fuck me over later with objectId() func.
const mappedDogParks = dogParks.dogParks.map((park) => {
  const newId = uuidv4();
  return { ...park, _id: newId };
});
console.log(mappedDogParks);
//set const for connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

const batchimport = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const parks = await db
      .collection(dogParksCollection)
      .insertMany(mappedDogParks);
    console.log(parks);
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

batchimport();
