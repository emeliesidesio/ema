import React from "react"
import "./index.css"

export default class Guest extends React.Component {

  onClickRemove = () => {
    this.props.handleRemove(this.props.id)
  }

  render() {
    return (
      <div className="guest-container">
        <p>{this.props.email}</p>
        <button type="button" onClick={this.onClickRemove}>Remove</button>
      </div>
    )
  }

}
