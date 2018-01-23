import React from "react"

export default class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
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

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => (
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      }, () => { console.log("State has been reset", response, response.status) })
    ))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signup-form">
          <div>First name<input type="text" value={this.state.firstName} onChange={this.handleFirstName} required /></div>
          <div>Last name<input type="text" value={this.state.lastName} onChange={this.handleLastName} required /></div>
          <div>Email<input type="email" value={this.state.email} onChange={this.handleEmail} required /></div>
          <div>Password<input type="password" value={this.state.password} onChange={this.handlePassword} required /></div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}
