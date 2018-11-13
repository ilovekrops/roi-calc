import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Step from '../Step/Step'
import Indicators from '../Indicators/Indicators'

import './Wizard.scss';

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
    this.params = {}
  }

  updateParams = (params) => {
    this.params = params
  }

  nextStep = () => {
    const { currentStep } = this.state
    const { wizardLength } = this.props
    if (currentStep < wizardLength - 1) {
      this.setState({
        currentStep: currentStep + 1
      })
    }
  }

  prevStep = () => {
    const { currentStep } = this.state
    if (currentStep > 0) {
      this.setState({
       currentStep: currentStep - 1
      })
    }
  }

  submitWizard = () => {
    const { onSubmit } = this.props
    if (onSubmit) onSubmit(this.params)
  }

  render() {
    const { currentStep } = this.state
    const { wizardLength } = this.props

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
            <Step currentStep={currentStep} updateParams={this.updateParams}/>
            <div className="Wizard-buttons">
              {currentStep !== 0 && <button className="Wizard-button Wizard-buttonPrev button-primary" onClick={ this.prevStep }>Prev</button> }
              {currentStep !== (wizardLength - 1) && <button className="Wizard-button Wizard-buttonNext button-primary" onClick={ this.nextStep }>Next</button> }
              {currentStep === (wizardLength - 1) && <button className="Wizard-button Wizard-buttonSubmit button-primary" onClick={ this.submitWizard }>Create Forecast</button> }
            </div>
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
