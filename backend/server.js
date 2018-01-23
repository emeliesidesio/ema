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

const User = mongoose.model("User", {
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
    required: true
  },
  accessToken: {
    type: String,
    default: () => uuid()
  }
})

const EventInfo = mongoose.model("eventInfo", {
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  guestPassword: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guest" }]
})

const Guest = mongoose.model("guest", {
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "EventInfo" },
  firstName: String,
  lastName: String,
  email: String,
  attending: Boolean,
  comment: String,
  passwordToken: String
})

// add guest:
app.post("/events/:eventId/guests", (req, res) => {
  const event = new Guest(req.body)

  event.save()
  .then(() => { res.status(201).json({answer: "Guest added"}) })
  .catch(err => { res.status(401).json(err) })
})

app.get("/events/:eventId/guests", (req, res) => {
  Guest.find().then(allGuests => {
    res.json(allGuests)
  })
})

// create event:
app.post("/events", (req, res) => {
  const event = new EventInfo({
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    description: req.body.description,
    guestPassword: req.body.guestPassword
  })

  event.save()
  .then(() => {
    const guestList = req.body.attendees.map(attendee => {
      const guest = new Guest({ email: attendee.email, eventId: event._id })
      return guest.save()
    })
    return Promise.all(guestList)
  }).then(() => {
    res.status(201).json({answer: "Event created"})
  })
  .catch(err => { res.status(401).json(err) })
})

app.get("/events", (req, res) => {
  EventInfo.find().then(allEvents => {
    res.json(allEvents)
  })
})

// signup part:
app.post("/signup", (req, res) => {
  const user = new User(req.body)
  user.password = bcrypt.hashSync(user.password)

  user.save()
  .then(() => { res.status(201).json({answer: "User created"}) })
  .catch(err => { res.status(401).json(err) })
})

app.get("/signup", (req, res) => {
  User.find().then(allUsers => {
    res.json(allUsers)
  })
})

// login part:
app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        message: "Welcome!",
        accessToken: user.token
      })
    } else {
      res.status(401).json({ message: "Authentication failed" })
    }
  })
})

// middleware
const findUser = (req, res, next) => {
  User.findById(req.params.userId).then(user => {
    if (user.accessToken === req.headers.token) {
      req.user = user
      next()
    } else {
      res.status(401).send("Unauthenticated")
    }
 })
}

// mount middleware
app.use("/users/:userId", findUser)

app.get("/users/:userId", (req, res) => {
    res.json(req.user)
})

app.listen(8080, () => console.log("EMA listening on port 8080!"))
