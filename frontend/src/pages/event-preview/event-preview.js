import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

export default class EventPreview extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      eventInfo: {}
    }
  }

  componentDidMount() {
    const { eventId } = this.props.match.params
    fetch(`https://seizethepartyevents.herokuapp.com/events/${eventId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        eventInfo: json
      })
    })
  }

  removeEvent = event => {
    event.preventDefault()
    const { eventId } = this.props.match.params
    fetch(`https://seizethepartyevents.herokuapp.com/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        this.props.history.push("/dashboard")
      }
    })
  }

  render() {
    const { date } = this.state.eventInfo
    const formattedData = moment(date).format("dddd MMM Do YYYY")
    return (
      <div className="event-page" style={{ backgroundImage: `url(${this.state.eventInfo.backgroundImage})` }}>
        <div className="navigation-preview">
          <Link to="/dashboard"><button id="yellow-btn">Dashboard</button></Link>
          <button id="delete-btn" onClick={this.removeEvent}>Delete event</button>
        </div>
        <div className="copy-container">
          <h1>{this.state.eventInfo.title}</h1>
          <h2>{this.state.eventInfo.description}</h2>
          <h3>Hosted by: {this.state.eventInfo.hostedBy}</h3><br />
          <h3>{formattedData}, {this.state.eventInfo.startTime} – {this.state.eventInfo.endTime}</h3>
          <h3>{this.state.eventInfo.location}</h3>
        </div>
        <div className="event-CTA-container">
          <button>I&lsquo;m joining</button>
          <button>I can&lsquo;t join</button>
        </div>
      </div>
    )
  }
}
