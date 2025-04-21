const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.port || 5000;

//middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://work-nest-client.web.app"
  ],
  credentials: true
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qvjjrvn.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db('work-nest').collection('users');
    const workSheetCollection = client.db('work-nest').collection('workSheets');
    const contactCollection = client.db('work-nest').collection('contacts');
    const serviceCollection = client.db('work-nest').collection('services');
    const reviewsCollection = client.db('work-nest').collection('reviews');
    const featuresCollection = client.db('work-nest').collection('features');

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'user already exists', insertedId: null })
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get('/role/:email', async (req, res) => {
      const email = req.params.email;
      // if (email !== req.decoded.email) {
      //   return res.status(403).send({ message: 'forbidden access' })
      // }
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // contact page api
    app.post("/contact-us", async (req, res) => {
      const messageData = req.body;
      const result = await contactCollection.insertOne(messageData);
      res.send(result);
    });

    // admin related apis
    app.get('/all-verified-employees', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.patch('/update-salary/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedSalary = {
        $set: {
          salary: req.body.salary
        },
      };
      const result = await userCollection.updateOne(filter, updatedSalary);
      res.send(result);
    });

    app.patch('/make-hr/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const makeHr = {
        $set: {
          role: 'hr'
        },
      };
      const result = await userCollection.updateOne(filter, makeHr);
      res.send(result);
    });

    app.patch('/fired-user/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const fireEmployee = {
        $set: {
          status: 'fired'
        },
      };
      const result = await userCollection.updateOne(filter, fireEmployee);
      res.send(result);
    });

    app.get('/admin-contact', async (req, res) => {
      const result = await contactCollection.find().toArray();
      res.send(result);
    });

    // employee related apis
    app.post('/work-sheet', async (req, res) => {
      const entry = req.body;
      const result = await workSheetCollection.insertOne(entry);
      res.send(result);
    });

    app.get('/work-sheet/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await workSheetCollection.find(query).toArray();
      res.send(result);
    });

    app.get('/employees-list', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.patch('/verify-employee/:id', async (req, res) => {
      const update = req.body?.verified;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const verifyEmployee = {
        $set: {
          verified: update
        },
      };
      const result = await userCollection.updateOne(filter, verifyEmployee);
      res.send(result);
    });

    // app.get('/all-work-records', async (req, res) => {
    //   const employee = req?.query?.employee || "";
    //   const query = employee ? { name: employee } : {};
    //   const result = await workSheetCollection.find(query).toArray();
    //   console.log('15222222',query);
    //   res.send(result);
    // });

    app.get('/all-work-records', async (req, res) => {
      const employee = req.query.employee || "";

      // Adjust 'employeeName' to match your DB schema
      const query = employee ? { employeeName: employee } : {};

      console.log("Filtering by employee:", employee);
      console.log("Query:", query);

      try {
        const result = await workSheetCollection.find(query).toArray();
        res.send(result);
      } catch (err) {
        console.error("Error fetching work records:", err);
        res.status(500).send({ error: "Something went wrong" });
      }
    });

    app.get('/testimonials', async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    app.get('/services', async (req, res) => {
      const result = await serviceCollection.find().toArray();
      res.send(result);
    });

    app.get('/features', async (req, res) => {
      const result = await featuresCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('work nest is sitting');
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});