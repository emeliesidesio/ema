import React from "react"

export default class ChooseBackground extends React.Component {

  render() {
    return (
      <option value={this.props.image}>{this.props.name}</option>
    )
  }
}
