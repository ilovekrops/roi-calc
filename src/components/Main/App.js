import React, { Component } from 'react';
import './App.scss'

import Wizard from '../Wizard/Wizard'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'welcome',
      data: {}
    }
  }

  goToWizard = () => {
    this.setState({ page: 'wizard' })
  }
  startAgain = () => {
    this.setState({ page: 'welcome' })
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
    });
  }

  convertNumber = (number) => {
    return number.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
  }

  render() {
    const { page, data } = this.state

    return (
      <div className="App">
        { page === 'welcome' &&
          <section className="App-content">
            <h1 className="App-title">Live PPV Event ROI Calculator</h1>
            <div className="App-subtitle">
              Ever wondered <span className="App--bold">how much money you can generate</span> with the Live Pay-Per-View model? Based on our experience in <span className="App--bold">managing over 10,000 PPV</span> events per year, we created this unique ROI calculator for you.
            </div>
            <button
              className="App-button button-primary"
              type="button"
              onClick={ this.goToWizard }
            >
              Give it a try!
            </button>
          </section>
        }
        { page === 'wizard' &&
          <Wizard wizardLength={3} onSubmit={this.calculate}/>
        }
        { page === 'summary' &&
          <div className="App-summary">
            <h2>IMPROVE YOUR PROFITS BY <span className="App--bold App-percentage">{data.percentage}%</span> WITH CLEENG!</h2>
            <p>Based on your entries, we estimate that you could generate <span className="App--bold">${this.convertNumber(data.profit)}</span> more in profits from your success-bound Cleeng event.</p>
            <table className="App-summaryTable">
              <tbody>
                <tr>
                  <td></td>
                  <td>Home Grown</td>
                  <td>Cleeng</td>
                </tr>
                <tr>
                  <td>Revenues</td>
                  <td>${this.convertNumber(data.details.revenues.hg)}</td>
                  <td>${this.convertNumber(data.details.revenues.cleeng)}</td>
                </tr>
                <tr>
                  <td>Costs</td>
                  <td>${this.convertNumber(data.details.costs.hg)}</td>
                  <td>${this.convertNumber(data.details.costs.cleeng)}</td>
                </tr>
                <tr>
                  <td>Profits</td>
                  <td>${this.convertNumber(data.details.profits.hg)}</td>
                  <td>${this.convertNumber(data.details.profits.cleeng)}</td>
                </tr>
              </tbody>
            </table>
            <p>Do you want to understand the logic behind this calculation? Grab your results and we will explain you everything about conversion rates, customer care and operation fees.</p>
            <button
              className="App-button button-primary"
              type="button"
              onClick={ this.startAgain }
            >
              Start Again
            </button>
          </div>
        }
      </div>
    );
  }
}

export default App;
