import React from "react"
import moment from "moment"
import "./index.css"

export default class MyEvent extends React.Component {

  handleGuestList = () => {
    this.props.showGuests(this.props.eventId)
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
        <button className="add-btn" onClick={this.handleGuestList}>Show guests</button>
      </div>
    )
  }
}
