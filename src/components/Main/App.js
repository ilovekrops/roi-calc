import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import history from '../../history'
import './App.scss'

import Welcome from '../Welcome/Welcome'
import Wizard from '../Wizard/Wizard'
import Summary from '../Summary/Summary'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        percentage: 0,
        profit: 0,
        details: {
          revenues: {
            hg: 0,
            cleeng: 0
          },
          costs: {
            hg: 0,
            cleeng: 0
          },
          profits: {
            hg: 0,
            cleeng: 0
          }
        }
      }
    }
  }

  calculate = (params) => {
    fetch('http://demo3051549.mockable.io/calculateroi', {
      method: 'post',
      body: JSON.stringify(params)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        page: 'summary',
        data: data
      })
      history.push('/summary')
    });
  }

  render() {
    const { data } = this.state

    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Welcome} />
          <Route path="/step/:id" render={(routeProps) => <Wizard {...routeProps} wizardLength={3} onSubmit={this.calculate} path={"step"}/>} />
          <Route path="/summary" render={() => <Summary data={data}/>} />
        </div>
      </Router>
    )
  }
}

export default App;
