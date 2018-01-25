import React from "react"

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
      <div>
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
