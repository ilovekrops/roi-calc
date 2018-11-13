import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Indicators.scss'

class Indicators extends Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired
  }

  render() {
    const { number, currentStep } = this.props

    return(
      <div className="Indicators">
        {[...Array(number).keys()].map((num) => (
          <div
            className={"Indicators-number " + (num <= currentStep ? 'Indicators--isActive' : '')}
            key={ num }
          >
            { num + 1 }
          </div>
        ))}
      </div>
    );
  }
}

export default Indicators;
