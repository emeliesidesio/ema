import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import uuid from "uuid/v4"
import bcrypt from "bcrypt-nodejs"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())

// Connect to MongoDB, on the "products-api" database. If the db doesn't
// exist, mongo will create it.
mongoose.connect("mongodb://localhost/ema")

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

//
// Define a model here.
// User Model:
const User = mongoose.model("User", {
  id: Number,
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required true
  },
  accessToken: {
    type: String,
    default: () => uuid()
  }
})
// Event info model:
const eventInfo = mongoose.model("eventInfo", {
  id: Number,
  title: {
    type: String
  },
  date: {
    type: Date
  },
  location: {
    type: String
  },
  guest: {
    name: String,
    attending: Boolean
  }
})

// Example root endpoint to get started with
app.get("/", (req, res) => {
  const password = "supersecretpassword"
  const hash = bcrypt.hashSync(password)

  res.send(`ema api. Here's an example of an encrypted password: ${hash}`)
})

// Add more endpoints here!
app.post("/users", (req, res) => {
  const { password } = req.body
  const hash = bcrypt.hashSync(password)

  const user = new User(req.body)

  user.save()
  .then(() => { res.status(201).json({answer: "User created, user signed In"}) })
  .catch(err => { res.status(401).json(err) })
})

app.get("/users", (req, res) => {
  User.find().then(allUsers => {
    res.json(allUsers)
  })
})

app.listen(8080, () => console.log("EMA listening on port 8080!"))
