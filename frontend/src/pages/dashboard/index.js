import React from "react"
import { Link } from "react-router-dom"
import MyEvent from "components/myevent/myevent"
import DashboardGuest from "components/dashboard-guest/dashboard-guest"
import "./index.css"

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      myEvents: [],
      myGuestList: []
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

  showGuestList = eventId => {
    fetch(`https://seizethepartyevents.herokuapp.com/events/${eventId}/guests`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        myGuestList: json
      })
    })
  }

  render() {
    const notanswer = this.state.myGuestList.filter((guest => guest.attending === ""))
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <h2>Upcoming events</h2>
          {this.state.myEvents.map(event => {
            return (
              <MyEvent
                key={event.title}
                title={event.title}
                date={event.date}
                eventId={event._id}
                showGuests={this.showGuestList} />
            )
          })}
          <div>
            {this.state.myGuestList.map(guest => {
              return <DashboardGuest
                email={guest.email}
                attending={guest.attending} />
            })}
          </div>
          <button className="medium-red-btn"><Link to="/create-event">Create new event</Link></button>
        </div>
      </div>
    )
  }
}
