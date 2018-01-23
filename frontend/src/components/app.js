import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import Home from "pages/home"
import Account from "pages/account"

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/account" component={Account} />
            <Link to="/account">Login / Signup</Link>
          </div>
        </BrowserRouter>
      </div>
    )
  }

}

export default App
