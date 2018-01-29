import React from "react"
import { Link } from "react-router-dom"
import MyEvent from "components/myevent/myevent"
import Guest from "components/guest/guest"

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      myEvents: [],
      myGuestList: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/events/", {
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

  // Denna funkar inte riktigt, fixa tisdag 30/1
  showGuestList = eventId => {
    fetch(`http://localhost8080/events/${eventId}/guests`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      console.log("hej", response)
      return response.json()
    }).then(json => {
      console.log("hej", json)
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
                title={event.title}
                date={event.date}
                eventId={event._id}
                showGuests={this.showGuestList} />
            )
          })}
          <div>
            {notanswer.map(guest => {
              return <Guest
                email={guest.email} />
            })}
          </div>
        </div>
        <Link to="/create-event">Create Event</Link>
      </div>
    )
  }
}
