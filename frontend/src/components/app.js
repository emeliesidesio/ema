import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "pages/home"
import Account from "pages/account"
import Event from "pages/event"
import Dashboard from "pages/dashboard"
import CreateEvent from "pages/create-event"

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/event/:eventId" component={Event} />
            <Route exact path="/create-event" component={CreateEvent} />
          </div>
        </BrowserRouter>
      </div>
    )
  }

}

export default App
