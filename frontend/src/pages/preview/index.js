import React from "react"

export default class Preview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guestList: []
    }
  }

  componentDidMount() {
    const guestEmail = this.props.match.params._id
    fetch(`http://localhost:8080/events/${guestEmail}/guests`, {
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

  render() {
  return (
    <div>
      Preview
  
    </div>
  )
}
}
