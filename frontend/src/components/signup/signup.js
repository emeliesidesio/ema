import React from "react"
import { withRouter } from "react-router-dom"
import "./index.css"

class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      message: ""
    }
  }

  handleEmail = event => {
    this.setState({
      email: event.target.value
    })
  }

  handlePassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleFirstName = event => {
    this.setState({
      firstName: event.target.value
    })
  }

  handleLastName = event => {
    this.setState({
      lastName: event.target.value
    })
  }

  handleAlert = () => {
    this.setState({
      message: "User already exists"
    })
    setTimeout(() => {
      this.setState({ message: "" })
    }, 3500)
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("https://seizethepartyevents.herokuapp.com/signup", {
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
            localStorage.setItem("userAccess", json.accessToken)
            localStorage.setItem("userId", json.userId)
            localStorage.setItem("userEmail", json.userEmail)
            this.props.history.push("/create-event/")
          })
      } else {
        this.handleAlert()
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signup-form">
          <div><input type="text" value={this.state.firstName} onChange={this.handleFirstName} required placeholder="First name" /></div>
          <div><input type="text" value={this.state.lastName} onChange={this.handleLastName} required placeholder="Last name" /></div>
          <div><input type="email" value={this.state.email} onChange={this.handleEmail} required placeholder="Email" /></div>
          <div><input type="password" value={this.state.password} onChange={this.handlePassword} required placeholder="Password" /></div>
          <button className="medium-blue-btn" type="submit">Sign up</button>
          <p id="signup-message">{this.state.message}</p>
        </form>
      </div>
    )
  }
}

export default withRouter(Signup)
