import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import uuid from "uuid/v4"
import bcrypt from "bcrypt-nodejs"
import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guest" }]
})

const Guest = mongoose.model("guest", {
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "EventInfo" },
  firstName: String,
  lastName: String,
  email: String,
  attending: {
    type: String,
    default: ""
  }
})

const authUser = (req, res, next) => {
  User.findById(req.headers.id).then(user => {
    if (user && user.accessToken === req.headers.token) {
      req.user = user
      next()
    } else {
      res.status(401).send("Unauthenticated")
    }
  })
}

// add guest:
app.post("/events/:eventId/guests", (req, res) => {
  const event = new Guest(req.body)

  event.save()
    .then(() => { res.status(201).json({ answer: "Guest added" }) })
    .catch(err => { res.status(401).json(err) })
})

app.get("/events/:eventId/guests", (req, res) => {
  Guest.find({ eventId: req.params.eventId }).then(eventGuests => {
    res.json(eventGuests)
  })
})

app.put("/events/:eventId/guests/:_id", (req, res) => {
  Guest.update(req.body)
    .then(() => { res.status(201).send("Guest was uppdated") })
    .catch(err => { res.status(401).send(err) })
})

app.get("/events/:eventId/guests/:_id", (req, res) => {
  Guest.find({ eventId: req.params.eventId, _id: req.params._id }).then(OneGuest => {
    res.json(OneGuest)
  })
})

app.delete("/events/:eventId/guests/:_id", (req, res) => {
  Guest.findByIdAndRemove({ eventId: req.params.eventId, _id: req.params._id })
    .then(() => { res.status(201).send("Guest was removed") })
    .catch(err => { res.status(401).send(err) })
})

app.post("/events", authUser)
// create event:
app.post("/events", (req, res) => {
  const event = new EventInfo({
    creator: req.user,
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    time: req.body.time,
    backgroundImage: req.body.backgroundImage,
    description: req.body.description
  })

  event.save()
    .then(() => {
      const guestList = req.body.guests.map(guest => {
        const oneGuest = new Guest({ email: guest.email, eventId: event._id })
        return oneGuest.save()
      })
      return Promise.all(guestList)
    }).then(() => {
      res.status(201).json(event)
    }).catch(err => {
      res.status(400).json(err)
    })
})

// app.get("/events/", (req, res) => {
//   EventInfo.find().then(allEvents => {
//     res.json(allEvents)
//   })
// })

// ny get
app.get("/events/", (req, res) => {
  EventInfo.find({ creator: req.headers.id }).then(events => {
    res.json(events)
  })
})

app.get("/events/:_id", (req, res) => {
  EventInfo.findOne().then(event => {
    res.json(event)
  })
})

// send emails
const sendMail = (to, text) => {
  const msg = {
    to: to,
    from: "noreply@seizetheparty.io",
    subject: "You're invited!",
    html: text
  }
  sgMail.send(msg)
}

app.post("/events/:eventId/send_emails", (req, res) => {
  Guest.find({ eventId: req.params.eventId }).then(eventGuests => {
    eventGuests.map(guest => {
      const url = `www.seizetheparty.io/${guest.eventId}/guests/${guest._id}`
      const emailMessage = `Hi, you are invited to a party! RSVP here: ${url}`
      sendMail(guest.email, emailMessage)
    })
  })
  res.status(200).json({ answer: "emails sent" })
})

// signup part: fixa att man inte kan signa upp två gånger
app.post("/signup", (req, res) => {
  const user = new User(req.body)
  user.password = bcrypt.hashSync(user.password)

  user.save()
    .then(() => { res.status(201).json({ answer: "User created", accessToken: user.accessToken, userId: user._id }) })
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
        accessToken: user.accessToken,
        userId: user._id
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
