import React from "react"

export default class OneEvent extends React.Component {
  render() {
    return (
      <div>
        {this.props.title}, {this.props.date}, {this.props.location}, {this.props.description}
      </div>
    )
  }
}
