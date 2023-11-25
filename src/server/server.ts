import * as express from 'express';
import { MongoClient } from 'mongodb'
import cors from 'cors';
// import redis from 'redis';
// import swaggerUi from 'swagger-ui-express'
// import YAML from 'yamljs'


const uri = process.env.MONGO_CONNECT_STRING;
if (typeof uri !== 'string') {
  throw new Error('wrong type')
}

const app = express();
const port = 3000;
// const redisPort = 6379;
app.use(cors())
app.use(express.json())

const client = new MongoClient(uri);
// const redisClient = redis.createClient(redisPort);
// redisClient.on()



// // app.get("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// const cache = (req, res, next) => {
//   const { movieName } = req.params;
//   try {
//     redisClient.get(movieName, (err, data) => {
//       if(err) throw Error;

//       if (data !== null) {
//         res.status(200).send(data)
//       }
//     })
//   }
//   catch (err) {
//     console.error(err);
//   }
// }

const findMovie = async(req, res) => {
  try {
    const database = client.db('sample_mflix')
    const movies = database.collection('movies');
    const { movieName } = req.query;
    
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: `${ movieName }` };
    const movie = await movies.findOne(query);

    // set the data in the redis cache
    // redisClient.setex({ movieName }, 3600, movie);
    res.status(200).send(movie)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
}

app.get("/", findMovie);

app.listen(port, () => console.log("Listening on", port));