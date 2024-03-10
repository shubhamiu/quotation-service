const mongodb = require("mongodb");

const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

let collection = undefined;

const MongoClient = require("mongodb").MongoClient;


async function connectToDB() {
  try{
    
    console.log("CLIENT after this")
    console.log( DBHOST );

  const client = await mongodb.MongoClient.connect(DBHOST, {
    useUnifiedTopology: true,
  });
 // Connects to the database.
    console.log("DB after this")
  const db = client.db(DBNAME);
  console.log("quotation collection after this")
  const quotations_collection = db.collection("quotations");
  console.log("CONNECTED TO DATABASE AND CAN ACCESS EVERYTHING")
  return quotations_collection;
  } catch(err){
    console.error("ERROR IS: ",err);
    throw err;
  }
}

async function selectAQuotation() {
    console.log("COLLECTION")
  if (!collection) {
    collection = await connectToDB();
    console.log("DB CONNECTED!!")
  }
  console.log(collection);
  const result = await collection.findOne({});
  return result;
}

module.exports = { selectAQuotation };
