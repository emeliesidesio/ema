import React from "react"
import { Link } from "react-router-dom"
import herogif from "assets/hero-start-slow.gif"
import "./index.css"

export default class Home extends React.Component {
  render() {
    return (
      <div className="start-page" style={{ backgroundImage: `url(${herogif})` }}>
        <div className="start-copy-container">
          <h1>Seize the Party</h1>
          <h2>Create dazzling sites for your events! Host a party, manage your wedding or
            create a launch party. The options are endless!
          </h2>
        </div>
        <div className="CTA-container">
          <Link to="/account"><button>Create event</button></Link>
          <Link to="/account"><button>Login</button></Link>
        </div>
      </div>
    )
  }
}
