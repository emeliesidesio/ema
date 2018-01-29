import React from "react"
import Guest from "./../../components/guest/guest"
import "./index.css"

export default class Preview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guestList: [],
      message: "",
      email: ""
    }
  }

  componentDidMount() {
    const eventId = this.props.match.params._id
    fetch(`http://localhost:8080/events/${eventId}/guests`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({
        guestList: json
      })
    })
  }

  sendInvite = event => {
    event.preventDefault()
    const eventId = this.props.match.params._id
    fetch(`http://localhost:8080/events/${eventId}/send_emails`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        return response.json()
        // this.setState({ message: "Invitations were sent" })
      } else {
        this.setState({ message: "Invitations were not sent" })
      }
    })
  }

  removeGuest = id => {
    const eventId = this.props.match.params._id
    const newGuestList = [...this.state.guestList]
    newGuestList.splice(id, 1)
    this.setState({
      guestList: newGuestList
    })
    fetch(`http://localhost:8080/events/${eventId}/guests/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log("Fail")
      }
    })
  }

  addInvite = event => {
    this.setState({
      email: event.target.value
    })
  }

  addEmailtoGuestList = event => {
    event.preventDefault()
    const eventId = this.props.match.params._id
    const guest = { email: this.state.email, eventId }
    this.setState({
      guestList: [guest, ...this.state.guestList],
      email: ""
    })
    fetch(`http://localhost:8080/events/${eventId}/guests`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(guest)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log("Fail")
      }
    })
  }

  render() {
    return (
      <div className="preview-page">
        <div className="email-list">
          {this.state.guestList.map(guest => {
            return (
              <Guest
                key={guest._id}
                id={guest._id}
                email={guest.email}
                handleRemove={this.removeGuest} />
            )
          })}
          <div className="add-guest-preview">
            <input type="email" value={this.state.email} onChange={this.addInvite} placeholder="Email address" />
            <button onClick={this.addEmailtoGuestList}>Add Guest</button>
          </div>
          <div className="send-invite">
            <button type="submit" onClick={this.sendInvite}>Send invite</button>
          </div>
          <div className="message">
            {this.state.message}
          </div>
        </div>
      </div>
    )
  }
}
