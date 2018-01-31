import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "pages/home"
import Account from "pages/account"
import Event from "pages/event"
import Dashboard from "pages/dashboard"
import CreateEvent from "pages/create-event"
import EventPreview from "pages/event-preview/event-preview"
import Preview from "pages/preview"

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/:eventId/guests/:_id" component={Event} />
            <Route exact path="/event/:eventId" component={EventPreview} />
            <Route exact path="/create-event/" component={CreateEvent} />
            <Route exact path="/create-event/preview/:_id" component={Preview} />
          </div>
        </BrowserRouter>
      </div>
    )
  }

}

export default App
