import React from "react"
import moment from "moment"

export default class MyEvent extends React.Component {

  handleGuestList = () => {
    this.props.showGuests(this.props.eventId)
  }

  render() {
    const { date } = this.props
    const formattedData = moment(date).format("dddd MMM Do YYYY")
    return (
      <div className="guest-container">
        <p>{this.props.title}</p>
        <p>{formattedData}</p>
        <button onClick={this.handleGuestList}>Show Guests</button>
        {/* <button className="small-btn" type="button" onClick={this.onClickRemove}>Remove</button> */}
      </div>
    )
  }
}
