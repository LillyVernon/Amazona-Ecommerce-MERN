import express from 'express';
import data from './data.js';

//npm start to run server with nodemon
const app =express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
  });

const port= process.env.PORT || 5000
app.listen(port, ()=>console.log(`server started on ${port}`))