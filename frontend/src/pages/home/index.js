import React from "react"
import { Link } from "react-router-dom"
import hero2 from "assets/hero-2.gif"
import "./index.css"

export default class Home extends React.Component {
  render() {
    return (
      <div className="start-page" style={{ backgroundImage: `url(${hero2})` }}>
        <div className="start-copy-container">
          <h1>Seize the Party</h1>
          <h2>Create dazzling sites for your events! Host a party, manage your wedding or
            create a launch party. The options are endless!
          </h2>
        </div>
        <div className="CTA-container">
          <button><Link to="/account">Create event</Link></button>
          <button><Link to="/account">Login</Link></button>
        </div>
      </div>
    )
  }
}
