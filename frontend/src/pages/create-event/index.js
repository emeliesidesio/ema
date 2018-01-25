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
      attendees: [],
      guestPassword: "",
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

  addEmailtoAttendeeList = event => {
    event.preventDefault()
    const guest = {email: this.state.email}
    this.setState({
      attendees: [guest, ...this.state.attendees],
      email: ""
    })
  }
  // handleAttendees = event => {
  //   this.setState({
  //     attendees: event.target.value
  //   })
  // }

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
        attendees: "",
        guestPassword: ""
      }, () => { console.log("State has been reset", response, response.status) })
    ))
  }

  // handleRemove = id => {
  //   fetch(`http://localhost:8080/events/${this.props.eventId}/guests`, {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(this.props.id)
  //     })
  //
  //   // const newGuestList = [...this.state.attendees]
  //   // newGuestList.splice(id, 1)
  //   // this.setState({
  //   //   attendees: newGuestList
  //   // }
  //
  //   console.log(id)
  //
  //   this.setState(prevState => ({
  //     attendees: prevState.attendees.splice(id, 1)
  //   }))
  //
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login-form">
          <div><input type="text" value={this.state.title} onChange={this.handleTitle} required placeholder="Title" /></div>
          <div><input type="text" value={this.state.description} onChange={this.handleDescription} required placeholder="Description" /></div>
          <div><input type="date" value={this.state.date} onChange={this.handleDate} required placeholder="Date" /></div>
          <div><input type="text" value={this.state.location} onChange={this.handleLocation} required placeholder="Location" /></div>
          <div><input type="text" value={this.state.guestPassword} onChange={this.handleGuestPassword} required placeholder="Password" /></div>
          <div>
            <input type="email" value={this.state.email} onChange={this.addInvite} placeholder="Invite" />
            <button onClick={this.addEmailtoAttendeeList}>Add person</button>
          </div>
          <button type="submit">Create event</button>
        </form>
        <button onClick={this.handlePreviewEvent}>Visar eventet</button>
        <div>{this.state.previewEvent}</div>
        {/* <h2>My invited guests</h2>
        {this.state.attendees.length > 0 ?
        this.state.attendees.map((attendee, index) => {
          return <Guest
            id={attendee._id}
            index={index}
            eventId={attendee.eventId}
            email={attendee.email}
            handleRemove={this.handleRemove} />
        }) : <p>Guestlist is empty</p>} */}
      </div>
    )
  }
}
