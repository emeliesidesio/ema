import React from "react"
import "./index.css"

export default class Event extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      eventInfo: ""
    }
  }

  componentDidMount() {
    console.log("Showing event")
    const eventId = this.props.match.params.eventId
    fetch(`http://localhost:8080/events/${eventId}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        eventInfo: json
      })
    })
  }

  render() {
    return (
      <div className="event-page" style={{ backgroundImage: `url(${this.state.eventInfo.backgroundImage})` }}>
          <div className="copy-container">
            <h1>{this.state.eventInfo.title}</h1>
            <h2>{this.state.eventInfo.description}</h2>
            <h2>{this.state.eventInfo.date}</h2>
            <h2>{this.state.eventInfo.time}</h2>
            <h2>{this.state.eventInfo.location}</h2>
          </div>
          <div className="CTA-container">
            <button>I'm Joining</button>
            <button>I cannot make it</button>
          </div>
      </div>
    )
  }
}
