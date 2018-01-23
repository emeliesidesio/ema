import React from "react"

export default class CreateEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      date: "",
      location: "",
      description: "",
      attendees: [{
        email: ""
      }],
      guestPassword: ""
    }
  }

  handleTitle = event => {
    this.setState({
      title: event.target.value
    })
  }

  handleDescription = event => {
    this.setState({
      description: event.target.value
    })
  }

  handleDate = event => {
    this.setState({
      date: event.target.value
    })
  }

  handleLocation = event => {
    this.setState({
      location: event.target.value
    })
  }

  handleAttendees = event => {
    this.setState({
      attendees: event.target.value
    })
  }

  handleGuestPassword = event => {
    this.setState({
      guestPassword: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/events", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => (
      this.setState ({
        title: "",
        date: "",
        location: "",
        description: "",
        guestPassword: ""
      }, () => { console.log("State has been reset", response, response.status) })
    ))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login-form">
          <div>Title<input type="text" value={this.state.title} onChange={this.handleTitle} required /></div>
          <div>Description<input type="text" value={this.state.description} onChange={this.handleDescription} required /></div>
          <div>Date<input type="date" value={this.state.date} onChange={this.handleDate} required /></div>
          <div>Location<input type="text" value={this.state.location} onChange={this.handleLocation} required /></div>
          <div>Password<input type="text" value={this.state.guestPassword} onChange={this.handleGuestPassword} required /></div>
          <div>Invite<input type="email" multiple value={this.state.attendees.email} onChange={this.handleAttendees} required /></div>
          <button type="submit">Create event</button>
        </form>
      </div>
    )
  }
}
