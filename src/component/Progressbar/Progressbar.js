import React, { Component } from "react";
import { steps } from "Route/Checkout/Checkout.config";
import "../Progressbar/Progressbar.style.scss";

class Progressbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
    };
  }

  isChecklistStepActive = (steps) => {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] === this.props.checkoutStep) {
        this.setState({ activeIndex: i });
      }
    }
  };
  componentDidMount() {
    this.isChecklistStepActive(steps);
  }

  render() {
    const { checkoutStep } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="progress-bar-container">
        {steps.map((step, i) => {
          if (i !== steps.length - 1) {
            //to remove the _STEP and lowercase the letters
            let modifiedWordStep = step.replace("_STEP", "").toLowerCase();
            //to capitalize the words
            const capitalizedWord =
              modifiedWordStep.charAt(0).toUpperCase() +
              modifiedWordStep.slice(1);
            return (
              <div key={i} className="progress-item progress-item-flex-child">
                <div className="progress-div">
                  <div
                    className={i <= activeIndex ? "progress-active" : ""}
                  ></div>
                </div>
                <div
                  className={
                    i <= activeIndex
                      ? "progress-bar-info-active"
                      : "progress-bar-info"
                  }
                >
                  <div
                    className={
                      i <= activeIndex ? "active-circle circle" : "circle"
                    }
                  >
                    {i < activeIndex ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                      </svg>
                    ) : (
                      i
                    )}
                  </div>
                  <h4>{capitalizedWord}</h4>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={steps.length - 1}
                className="progress-item-flex-child align-items-center"
              >
                <div className="progress-div">
                  <div
                    className={
                      steps.length - 1 === activeIndex ? "progress-active " : ""
                    }
                  ></div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.checkoutStep !== this.props.checkoutStep) {
      this.isChecklistStepActive(steps);
    }
  }
}

export default Progressbar;
