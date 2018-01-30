import React from "react"
import "./index.css"

export default class DashboardGuest extends React.Component {

  render() {
    return (
      <div className="guest-container">
        <p>{this.props.email}</p>
        <p className="add-btn">{this.props.attending}</p>
      </div>
    )
  }
}
