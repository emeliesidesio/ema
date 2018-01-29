import React from "react"
import "./index.css"

export default class ChooseBackground extends React.Component {

  render() {
    return (
      <option value={this.props.image}>{this.props.name}</option>
    )
  }
}
