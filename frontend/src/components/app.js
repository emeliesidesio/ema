import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import Home from "pages/home"
import Login from "pages/login"

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Link to="/login">Login / Signup</Link>
          </div>
        </BrowserRouter>
      </div>
    )
  }

}

export default App
