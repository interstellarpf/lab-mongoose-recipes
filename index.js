const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const newRecipe = {
  title: "Sopa de Caracol",
  level: "Easy Peasy",
  ingredients: ["sopa", "caracoles", "hey"],
  cuisine: "Centroamericana",
  dishType: "soup",
  duration: 50,
  creator: "Juan Cocina",
};
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(newRecipe)
      .then((newRecp) =>
        console.log(`The new added recipe it's called ${newRecp.title}`)
      )

      .then(() => {
        Recipe.insertMany(data);
        data.forEach((recp) => {
          console.log(`Recipe name: ${recp.title}`);
        });
      })

      .then(() =>
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
      )
      .then((updt) => console.log("The updated recipe is", updt))

      .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
      .then(() => console.log("Carrot Cake recipe has been eliminated"))

      .then(() => mongoose.connection.close())
      .then(() => console.log("Database disconnected, goodbye!"));
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
