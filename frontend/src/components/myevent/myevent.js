import React from "react"
import moment from "moment"
import DashboardGuest from "components/dashboard-guest/dashboard-guest"
import "./index.css"

export default class MyEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      myGuestList: [],
      down: false
    }
  }

  handleGuestList = () => {
    this.showGuestList(this.props.eventId)
    this.setState({
      down: !this.state.down
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
    const { date } = this.props
    const formattedData = moment(date).format("dddd MMM Do YYYY")
    return (
      <div className="myevent-container">
        <div className="event-info">
          <h4>{this.props.title}</h4>
          <p>{formattedData}</p>
        </div>
        <div className="guest-accordion">
          <button className="add-btn" onClick={this.handleGuestList}>Show guests</button>
          <div className={this.state.down ? "down" : "up"}>
            {this.state.myGuestList.map(guest => {
              return <DashboardGuest
                className={this.state.down ? "down" : "up"}
                email={guest.email}
                attending={guest.attending} />
            })}
          </div>
        </div>
      </div>
    )
  }
}
