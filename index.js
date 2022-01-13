import { MongoClient } from "mongodb";
import cron from "node-cron";
import { v4 as uuid4 } from "uuid";

const MONGO_URL = "mongodb://localhost";

async function createMongoConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect(() => {
    console.log("mongo connected");
  });
  return client;
}

const client = await createMongoConnection();

//will add unique id to db at 2am and 2pm
cron.schedule("00 02,14 * * *", () => {
  client
    .db("scheduler")
    .collection("timer")
    .insertOne({ data: uuid4(), insertedAt: new Date().toLocaleString() });
});
