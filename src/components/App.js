import React, { Component } from 'react'
import LinkList from './LinkList'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/top" component={LinkList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
