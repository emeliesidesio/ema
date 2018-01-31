import React from "react"
import "./index.css"

export default class DashboardGuest extends React.Component {

  render() {
    return (
      <div className="dashboard-guest-container">
        <p>{this.props.email}</p>
        <div className="yellow-btn">{this.props.attending}</div>
      </div>
    )
  }
}
