import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import './Summary.scss'

class Summary extends Component {

  static propTypes = {
    data: PropTypes.object
  }

  convertNumber = (number) => {
    return number && number.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
  }

  render() {
    const { data } = this.props

    return (
      <div className="Summary">
        <h2>IMPROVE YOUR PROFITS BY <span className="bold Summary-percentage">{data.percentage}%</span> WITH CLEENG!</h2>
        <p>Based on your entries, we estimate that you could generate <span className="bold">${this.convertNumber(data.profit)}</span> more in profits from your success-bound Cleeng event.</p>
        <table className="Summary-table">
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
        <Link
          to="/"
          className="Summary-button button-primary"
        >
          Start Again
        </Link>
      </div>
    );
  }
}

export default Summary;
