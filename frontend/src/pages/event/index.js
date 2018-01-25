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

  // showEvent = _id => {
  //   fetch(`http://localhost:8080/events/${_id}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json"
  //     }
  //   }).then(response => {
  //     return response.json()
  //   }).then(json => {
  //     const eventMatch = json.find(item => {
  //       item._id === this.state.event
  //       console.log("eventet", eventMatch)
  //     })
  //     this.setState({
  //       eventInfo: eventMatch
  //     })
  //   })
  // }

  // componentWillMount() {
  //   fetch("http://localhost:8080/events/").then(response => (
  //     response.json()
  //   )).then(json => {
  //     const eventMatch = json.find(item => (
  //       item._id === this.state.event
  //       // {this.props.match.params._id}
  //     ))
  //     this.setState({ eventInfo: eventMatch })
  //   }, () => {
  //     console.log( "eventet", this.state.eventInfo)
  //   })
  // }

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
