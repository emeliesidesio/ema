import React from "react"


export default class Guest extends React.Component {

  onClickRemove = () => {
    this.props.handleRemove(this.props.index)
  }

  render() {
    return (
      <div>
        <p>{this.props.email}</p>
          <button
            className="remove"
            type="button"
            onClick={this.onClickRemove}>Remove guest</button>

      </div>
    )
  }

}
