const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({title: 'Sopa de Caracol', level: 'Easy Peasy', ingredients: ['sopa', 'caracol'], cuisine: 'Argentina', dishType: 'other', duration: 15, creator: 'el mas capo'})
  })

  .then(() => {
    Recipe.insertMany(data);
    data.forEach(elem => {
      console.log(`Recipe name: ${elem.title}`)
    });
    

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
