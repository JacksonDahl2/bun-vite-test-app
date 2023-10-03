import express from 'express';
import { MongoClient } from 'mongodb'
import cors from 'cors';


const uri = process.env.MONGO_CONNECT_STRING;
if (typeof uri !== 'string') {
  throw new Error('wrong type')
}
const client = new MongoClient(uri);

const app = express();
const port = 3000;
app.use(cors())

app.get("/", async (req, res) => {

  console.log(`uri is type ${typeof uri} and its val is ${uri}`)
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  // Query for a movie that has the title 'Back to the Future'
  const query = { title: 'Back to the Future' };
  const movie = await movies.findOne(query);

  console.log('got movies')
  res.status(200).json(movie);
});
app.listen(port, () => console.log("Listening on", port));