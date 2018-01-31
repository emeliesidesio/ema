import React from "react"
import moment from "moment"
import "./index.css"

export default class Event extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      eventInfo: {},
      reply: "",
      message: "",
      show: false
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

  handleAlert = () => {
    if (this.state.reply === "Yes") {
      this.setState({
        message: "Yey, you are joining the party!",
        show: !this.state.show
      })
      setTimeout(() => {
        this.setState({ message: "", show: "" })
      }, 3500)
    } else if (this.state.reply === "No") {
      this.setState({
        message: "See you at the next party!",
        show: !this.state.show
      })
      setTimeout(() => {
        this.setState({ message: "", show: "" })
      }, 3500)
    }
  }

  handleRSVP = event => {
    event.preventDefault()
    this.setState({
      reply: event.target.value
    }, () => {
      const { eventId } = this.props.match.params
      const { _id } = this.props.match.params
      fetch(`https://seizethepartyevents.herokuapp.com/events/${eventId}/guests/${_id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ attending: this.state.reply })
      })
      this.handleAlert()
    })
  }

  render() {
    const { date } = this.state.eventInfo
    const formattedData = moment(date).format("dddd MMM Do YYYY")
    return (
      <div>
        <div className={this.state.show ? "show" : "hide"}>
          <div className="message">{this.state.message}</div>
        </div>
        <div className="event-page" style={{ backgroundImage: `url(${this.state.eventInfo.backgroundImage})` }}>
          <div className="copy-container">
            <h1>{this.state.eventInfo.title}</h1>
            <h2>{this.state.eventInfo.description}</h2>
            <h3>{formattedData}, {this.state.eventInfo.startTime} – {this.state.eventInfo.endTime}</h3>
            <h3>{this.state.eventInfo.location}</h3>
          </div>
          <div className="CTA-container">
            <button value="Yes" onClick={this.handleRSVP}>I&lsquo;m joining</button>
            <button value="No" onClick={this.handleRSVP}>I cannot make it</button>
          </div>
        </div>
      </div>
    )
  }
}
