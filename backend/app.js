const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");
const userRoutes = require("./routes/user-routes")
const todoRoutes = require("./routes/todo-routes")

//Models
const User = require("./models/user-model");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Route Middleware
app.use("/user", userRoutes)
app.use("/todo", todoRoutes)

app.get("/", (req, res) => {
  res.send("Hello");
});

mongoose
  .connect(
    `mongodb+srv://omerbkk06:19901992@cluster0.f6uwe.mongodb.net/todo?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database is connected!");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
