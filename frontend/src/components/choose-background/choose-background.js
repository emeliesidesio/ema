import React from "react"
import "./index.css"

export default class ChooseBackground extends React.Component {

  render() {
    return (
      // <label className="background-radio">
      //   <input type="radio" value={this.props.image} name="background" onChange={this.props.chooseBackground} />
      //   {this.props.name}
      // </label>
      <option value={this.props.image}>
      {this.props.name}
      </option>
    )
  }
}
