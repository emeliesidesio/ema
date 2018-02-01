import React from "react"
import { Link } from "react-router-dom"
import MyEvent from "components/myevent/myevent"
import "./index.css"

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      myEvents: []
    }
  }

  componentDidMount() {
    fetch("https://seizethepartyevents.herokuapp.com/events", {
      method: "GET",
      headers: {
        token: localStorage.getItem("userAccess"),
        id: localStorage.getItem("userId"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        myEvents: json
      })
    })
  }

  handleLogout = event => {
    event.preventDefault()
    fetch("https://seizethepartyevents.herokuapp.com/logout", {
      method: "POST",
      headers: {
        token: localStorage.getItem("userAccess"),
        id: localStorage.getItem("userId"),
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        localStorage.removeItem("userId", "userAccess")
        this.props.history.push("/")
      }
    })
  }

  render() {
    return (
      <div className="dashboard-page">
        <button className="remove-btn" onClick="handleLogout">Sign out</button>
        <div className="dashboard-container">
          <h2>Upcoming events</h2>
          {this.state.myEvents.map(event => {
            return (
              <MyEvent
                key={event.title}
                title={event.title}
                date={event.date}
                eventId={event._id} />
            )
          })}
          <Link to="/create-event"><button className="medium-red-btn">Create new event</button></Link>
        </div>
      </div>
    )
  }
}
