import React from "react"
import moment from "moment"
import "./index.css"

export default class Event extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      eventInfo: "",
      reply: ""
    }
  }

  componentDidMount() {
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

  handleRSVP = event => {
    event.preventDefault()
    this.setState({
      reply: event.target.value
    }, () => {
      const eventId = this.props.match.params.eventId
      const _id = this.props.match.params._id
      fetch(`http://localhost:8080/events/${eventId}/guests/${_id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ attending: this.state.reply })
      })
    })
  }

  render() {
    const date = this.state.eventInfo.date
    const formattedData = moment(date).format("dddd MMM Do YY")
    return (
      <div className="event-page" style={{ backgroundImage: `url(${this.state.eventInfo.backgroundImage})` }}>
          <div className="copy-container">
            <h1>{this.state.eventInfo.title}</h1>
            <h2>{this.state.eventInfo.description}</h2>
            <h2>{formattedData}</h2>
            <h2>{this.state.eventInfo.time}</h2>
            <h2>{this.state.eventInfo.location}</h2>
          </div>
          <div className="CTA-container">
            <button value="Yes" onClick={this.handleRSVP}>I'm joining</button>
            <button value="No" onClick={this.handleRSVP}>I cannot make it</button>
          </div>
      </div>
    )
  }
}
