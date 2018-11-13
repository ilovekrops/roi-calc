import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Slider from 'rc-slider';

import './Step.scss';
import 'rc-slider/assets/index.css';

const Handle = Slider.Handle;

class Step extends Component {

  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    updateParams: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.values = {
      quality: 'mid',
      amount: 15000,
      cost: 20
    }
    this.props.updateParams(this.values)
  }

  handleAmount = (props) => {
    const { value, ...restProps } = props;
    return (
      <Handle value={value} {...restProps}>{value / 1000}k</Handle>
    );
  }
  handleCost = (props) => {
    const { value,...restProps } = props;
    return (
      <Handle value={value} {...restProps}>${value}</Handle>
    );
  }
  setValue = (value, key) => {
    this.values[key] = value
    this.props.updateParams(this.values)
    console.log('aaa', this.values)
  }

  setAmount = (value) => {
    this.setValue(value, 'amount')
  }
  setCost = (value) => {
    this.setValue(value, 'cost')
  }
  setQuality = (value) => {
    this.setValue(value.target.value, 'quality')
  }


  render() {
    const { currentStep } = this.props
    const handleStyle={
      border: 0,
      borderRadius: 0,
      height: 25,
      width: 50,
      marginLeft: -25,
      bottom: -5
    }

    return(
      <div className="Step">
        { currentStep === 0 &&
          <div>
            <p className="Step-instruction">
              When you are building your monetization platform, you consider the costs of design, streaming, along with landing page and e-commerce checkout development.
            </p>
            <p>What level of streaming quality are you aiming for?</p>
            <div className="Step-radio">
              <input type="radio" id="high" name="quality" value="high" onChange={this.setQuality} />
              <label htmlFor="high">High</label>
            </div>
            <div className="Step-radio">
              <input type="radio" id="mid" name="quality" value="mid" onChange={this.setQuality} defaultChecked/>
              <label htmlFor="mid">Mid</label>
            </div>
            <div className="Step-radio">
              <input type="radio" id="entry" name="quality" onChange={this.setQuality} value="entry"/>
              <label htmlFor="entry">Entry</label>
            </div>
          </div>
        }
        { currentStep === 1 &&
          <div className="Step-slider">
            <p>How many tickets do you estimate to sell?</p>
            <Slider
              min={0}
              max={50000}
              defaultValue={15000}
              handleStyle={handleStyle}
              step={100}
              handle={this.handleAmount}
              trackStyle={{ backgroundColor: '#26afe0' }}
              onAfterChange={this.setAmount}
            />
            <span className="Step-sliderMin">0</span>
            <span className="Step-sliderMax">50K</span>
          </div>
        }
        { currentStep === 2 &&
          <div className="Step-slider">
            <p>How much do you plan to charge per ticket for your Live PPV event?</p>
            <Slider
              min={0}
              max={50}
              defaultValue={20}
              handleStyle={handleStyle}
              handle={this.handleCost}
              trackStyle={{ backgroundColor: '#26afe0' }}
              onAfterChange={this.setCost}
            />
            <span className="Step-sliderMin">0</span>
            <span className="Step-sliderMax">$50</span>
          </div>
        }
      </div>
    );
  }
}

export default Step;
