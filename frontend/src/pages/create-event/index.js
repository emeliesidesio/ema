import React from "react"
import Guest from "./../../components/guest/guest"
import "./index.css"

export default class CreateEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      date: "",
      location: "",
      description: "",
      email: "",
      guests: [],
      time: "",
      previewEvent: ""
    }
  }

  handlePreviewEvent = _id => {
  fetch(`http://localhost:8080/events/${_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(response => (
    response.json()
  )).then(json => {
    this.setState({ previewEvent: json })
  })
  console.log("Eventinfo for preview", this.state.previewEvent)
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

  addInvite = event => {
    this.setState({
      email: event.target.value
    })
  }

  addEmailtoGuestList = event => {
    event.preventDefault()
    const guest = {email: this.state.email}
    this.setState({
      guests: [guest, ...this.state.attendees],
      email: ""
    })
  }

  handleTime = event => {
    this.setState({
      time: event.target.value
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
        attendees: "",
        time: ""
      }, () => { console.log("State has been reset", response, response.status) })
    ))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="create-form">
          <div><input type="text" value={this.state.title} onChange={this.handleTitle} required placeholder="Title" /></div>
          <div><input type="text" value={this.state.description} onChange={this.handleDescription} required placeholder="Description" /></div>
          <div><input type="date" value={this.state.date} onChange={this.handleDate} required placeholder="Date" /></div>
          <div><input type="time" value={this.state.time} onChange={this.handleTime} required placeholder="Time" /></div>
          <div><input type="text" value={this.state.location} onChange={this.handleLocation} required placeholder="Location" /></div>
          <div>
            <input type="email" value={this.state.email} onChange={this.addInvite} placeholder="Invite" />
            <button onClick={this.addEmailtoGuestList}>Add person</button>
          </div>
          <button type="submit">Create event</button>
        </form>
      </div>
    )
  }
}
