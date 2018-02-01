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

  render() {
    return (
      <div className="dashboard-page">
        {/* <button classname="remove-btn" onClick="handleLogout"></button> */}
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
          <button className="medium-red-btn"><Link to="/create-event">Create new event</Link></button>
        </div>
      </div>
    )
  }
}
