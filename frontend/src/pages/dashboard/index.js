import React from "react"
import { Link } from "react-router-dom"
import MyEvent from "components/myevent/myevent"
import DashboardGuest from "components/dashboard-guest/dashboard-guest"

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
      <div>
        <div className="event-list">
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
        </div>
        <Link to="/create-event">Create Event</Link>
      </div>
    )
  }
}
