import React from "react"
import { Link } from "react-router-dom"

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        Dashboard
        <Link to="/create-event">Create Event</Link>
      </div>
    )
  }
}
