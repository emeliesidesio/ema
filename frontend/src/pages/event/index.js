import React from "react"

export default class Event extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      eventInfo: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/events").then(response => (
      response.json()
    )).then(json => {
      const eventMatch = json.find(item => (
        item._id === "5a670c9b148e5c18aa7c8f4a"
        // {this.props.match.params._id}
      ))
      this.setState({ eventInfo: eventMatch })
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
