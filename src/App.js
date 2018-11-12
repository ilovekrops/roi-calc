import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'

import Wizard from './components/Wizard/Wizard'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isWelcomePage: true
    }
  }

  handleClick = (e) => {
    this.setState({ isWelcomePage: false })
  }

  calculate = () => {
    const params = { cost: 12 }
    fetch('http://demo3051549.mockable.io/calculateroi', {
      method: 'post',
      body: JSON.stringify(params)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log('DATA', data)
    });
  }

  render() {
    const { isWelcomePage } = this.state

    return (
      <div className="App">
        { isWelcomePage ?
          <section className="App-content">
            <h1 className="App-title">Live PPV Event ROI Calculator</h1>
            <div className="App-subtitle">
              Ever wondered <span className="App--bold">how much money you can generate</span> with the Live Pay-Per-View model? Based on our experience in <span className="App--bold">managing over 10,000 PPV</span> events per year, we created this unique ROI calculator for you.
            </div>
            <button
              className="App-button"
              type="button"
              onClick={ this.handleClick }
            >
              Give it a try!
            </button>
          </section>
          :
          <Wizard wizardLength={3} onSubmit={this.calculate}/>
        }
      </div>
    );
  }
}

export default App;
