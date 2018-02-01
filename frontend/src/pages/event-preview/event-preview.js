import React from "react"
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
        this.props.history.push("/")
      }
    })
  }

  render() {
    const { date } = this.state.eventInfo
    const formattedData = moment(date).format("dddd MMM Do YYYY")
    return (
      <div className="event-page" style={{ backgroundImage: `url(${this.state.eventInfo.backgroundImage})` }}>
        <button onClick={this.removeEvent}>Delete your event</button>
        <div className="copy-container">
          <h1>{this.state.eventInfo.title}</h1>
          <h2>{this.state.eventInfo.description}</h2>
          <h3>{formattedData}, {this.state.eventInfo.startTime} – {this.state.eventInfo.endTime}</h3>
          <h3>{this.state.eventInfo.location}</h3>
        </div>
        <div className="event-CTA-container">
          <button>I&lsquo;m joining</button>
          <button>I cannot make it</button>
        </div>
      </div>
    )
  }
}
