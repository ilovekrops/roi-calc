import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Welcome.scss'

class Welcome extends Component {

  render() {
    return (
      <section className="Welcome-content">
        <h1 className="Welcome-title">Live PPV Event ROI Calculator</h1>
        <div className="Welcome-subtitle">
          Ever wondered <span className="bold">how much money you can generate</span> with the Live Pay-Per-View model? Based on our experience in <span className="bold">managing over 10,000 PPV</span> events per year, we created this unique ROI calculator for you.
        </div>
        <button
          className="Welcome-button button-primary"
          type="button"
        >
          <Link to="/step/1">Give it a try!</Link>
        </button>
      </section>
    );
  }
}

export default Welcome;
