import React from "react"
import { withRouter } from "react-router-dom"
import Background from "assets/images"
import ChooseBackground from "components/choose-background/choose-background"
import "./index.css"

class CreateEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      creator: "",
      title: "",
      date: "",
      location: "",
      description: "",
      email: "",
      guests: [],
      startTime: "",
      endTime: "",
      backgroundImage: "",
      message: ""
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

  addInvite = event => {
    this.setState({
      email: event.target.value
    })
  }

  handleBackground = event => {
    this.setState({
      backgroundImage: event.target.value
    })
  }

  addEmailtoGuestList = event => {
    event.preventDefault()
    const guest = { email: this.state.email }
    this.setState({
      guests: [guest, ...this.state.guests],
      email: ""
    })
  }

  handleStartTime = event => {
    this.setState({
      startTime: event.target.value
    })
  }

  handleEndTime = event => {
    this.setState({
      endTime: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("https://seizethepartyevents.herokuapp.com/events", {
      method: "POST",
      headers: {
        token: localStorage.getItem("userAccess"),
        id: localStorage.getItem("userId"),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        this.setState({ message: "Event was not created" })
      }
    }).then(json => {
      this.props.history.push(`/create-event/preview/${json._id}`)
    })
  }

  render() {
    return (
      <div className="create-event-page" style={{ backgroundImage: `url(${this.state.backgroundImage})` }}>
        <form onSubmit={this.handleSubmit} className="create-form">
          <div><input type="text" value={this.state.title} onChange={this.handleTitle} required placeholder="Title" /></div>
          <div><input type="text" value={this.state.description} onChange={this.handleDescription} required placeholder="Description" /></div>
          <div><input type="date" value={this.state.date} onChange={this.handleDate} required placeholder="Date" /></div>
          <div className="time-input">
            <div><p>Start</p><input type="time" value={this.state.startTime} onChange={this.handleStartTime} required /></div>
            <div><p>End</p><input type="time" value={this.state.endTime} onChange={this.handleEndTime} required /></div>
          </div>
          <div><input type="text" value={this.state.location} onChange={this.handleLocation} required placeholder="Location" /></div>
          <select className="scroll-container" onChange={this.handleBackground}>
            <option>Choose theme</option>
            {Background.map(background => (
              <ChooseBackground
                key={background.id}
                image={background.image}
                name={background.name}
                chooseBackground={this.handleBackground} />
            ))}
          </select>
          <div className="add-guest">
            <input type="email" value={this.state.email} onChange={this.addInvite} placeholder="Email address" />
            <button className="add-btn" onClick={this.addEmailtoGuestList}>Add</button>
          </div>
          <button className="medium-red-btn" type="submit">Create event</button>
          <div className="message">
            {this.state.message}
            {this.state.creator}
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(CreateEvent)
