import React from "react"
import { Link } from "react-router-dom"
import Guest from "./../../components/guest/guest"
import "./index.css"

export default class Preview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guestList: [],
      email: ""
    }
  }

  componentDidMount() {
    const eventId = this.props.match.params._id
    fetch(`https://seizethepartyevents.herokuapp.com/events/${eventId}/guests`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        guestList: json
      })
    })
  }

  confirmSentEmail = () => {
    alert("Invites were sent")
  }

  sendInvite = event => {
    event.preventDefault()
    const eventId = this.props.match.params._id
    fetch(`https://seizethepartyevents.herokuapp.com/events/${eventId}/send_emails`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        return response.json()
          .then(json => {
            this.confirmSentEmail()
          })
      } else {
        this.setState({ message: "Invitations were not sent" })
      }
    })
  }

  removeGuest = id => {
    const eventId = this.props.match.params._id
    const newGuestList = [...this.state.guestList]
    const guest = this.state.guestList.find(a => a._id === id)
    const index = this.state.guestList.indexOf(guest)
    newGuestList.splice(index, 1)
    this.setState({
      guestList: newGuestList
    })
    fetch(`https://seizethepartyevents.herokuapp.com/events/${eventId}/guests/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        this.setState({
          guestList: newGuestList
        })
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
    fetch(`https://seizethepartyevents.herokuapp.com/events/${eventId}/guests`, {
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
    }).then(json => {
      this.setState({
        guestList: [...this.state.guestList, json],
        email: ""
      })
    })
  }

  render() {
    return (
      <div className="preview-page">
        <h2>Edit your guestlist</h2>
        <div className="preview-container">
          <div className="email-list">
            {this.state.guestList.map(guest => {
              return (
                <Guest
                  key={guest.email}
                  id={guest._id}
                  email={guest.email}
                  handleRemove={this.removeGuest} />
              )
            })}
          </div>
          <form onSubmit={this.addEmailtoGuestList} className="add-guest-preview">
            <input type="email" value={this.state.email} onChange={this.addInvite} placeholder="Email address" />
            <button className="add-btn">Add Guest</button>
          </form>
          <div className="send-invite">
            <button className="medium-blue-btn" type="submit" onClick={this.sendInvite}>Send invite</button>
          </div>
        </div>
        <div className="link-container">
          <Link to={`/${this.props.match.params._id}`} rel="noopener noreferrer" target="_blank"><button className="yellow-btn">Preview event</button></Link>
          <Link to="/dashboard"><button className="add-btn">Dashboard</button></Link>
        </div>
      </div>
    )
  }
}
