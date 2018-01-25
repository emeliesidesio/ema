import React from "react"

export default class Event extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      event: "",
      eventInfo: ""
    }
  }

  handleEvent = event => {
    this.setState({
      event: event.target.value
    })
  }

  showEvent = e => {
    e.preventDefault()
    console.log("Showing event")
    const eventId = this.state.event
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
      <div>
        <form onSubmit={this.showEvent} >
        <input type="text" value={this.state.value} onChange={this.handleEvent} />
        <button>Seize your Party</button>
        </form>
        <p>This is your event</p>
          <div>
            {this.state.eventInfo.title}
            {this.state.eventInfo.date}
            {this.state.eventInfo.location}
          </div>
      </div>
    )
  }
}
