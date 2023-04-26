import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString =
  "mongodb+srv://pinguin:kSoYYijnEfyEnDU0@cluster0.xotatp5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let dbConnection;

export default {
  connectToServer: function (callback) {
    client.connect((err, db) => {
      // Make sure to add IP Address to whitelist
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("scores");
      console.log("Successfully connected to MongoDB...");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
