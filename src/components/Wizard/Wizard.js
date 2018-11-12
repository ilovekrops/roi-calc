import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Step from '../Step/Step'
import Indicators from '../Indicators/Indicators'

import './Wizard.css';

class Wizard extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    wizardLength: PropTypes.number.isRequired
  }

  static defaultProps = {
    onSubmit: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0
    };
  }

  nextStep = () => {
    const { currentStep } = this.state
    if (currentStep <= 3) {
      this.setState({
       currentStep: currentStep + 1
      })
    }
  }

  prevStep = () => {
    const { currentStep } = this.state
    if (currentStep > 0 ) {
      this.setState({
       currentStep: currentStep - 1
      })
    }
  }

  submitWizard = () => {
    const { onSubmit } = this.props
    if (onSubmit) onSubmit()
  }

  render() {
    const { currentStep } = this.state
    const { wizardLength } = this.props
    console.log('in Wizard', currentStep)

    return(
      <div className="Wizard">
        <h1 className="Wizard-title">
          Churn Impact Forecast
        </h1>
        <div className="Wizard-subtitle">
          To forecast the impact of churn on your future subscription revenues, please enter the following inputs.
        </div>
        <div className="Wizard-content">
          <div className="Wizard-contentTitle">
            Use the sliders to enter inputs
          </div>
          <div className="Wizard-contentQuestion">
            <Step currentStep={currentStep} />
            {currentStep !== 0 && <button className="App-button" onClick={ this.prevStep }>Prev</button> }
            {currentStep !== (wizardLength - 1) && <button className="App-button" onClick={ this.nextStep }>Next</button> }
            {currentStep === (wizardLength - 1) && <button className="App-button" onClick={ this.submitWizard }>Create Forecast</button> }
          </div>
        </div>
        <Indicators
          number = { wizardLength }
          currentStep = { currentStep }
        />
      </div>
    );
  }
}

export default Wizard;
