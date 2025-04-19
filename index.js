const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.port || 5000;

//middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('work nest is sitting');
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});