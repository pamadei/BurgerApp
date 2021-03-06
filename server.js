const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path')

const orders = require('./routes/api/orders')

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose
  .connect(db, options)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection failed'));



// Setting up Express App
const app = express();

// Setting up Body Parser
app.use(bodyParser.json())

// Setting up Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Api Orders
app.use('/api/orders', orders);

// Serve static assets if in Production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('frontend/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Port 
const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log (`Server started on port ${port}`));



