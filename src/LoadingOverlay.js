import React from "react";

class LoadingOverlay extends React.Component {
  render() {
    return (
      <section className="LoadingOverlay">
        <img alt="Loading graphic" src={require("./EclipseLoading.svg")} />
      </section>
    );
  }
}

export default LoadingOverlay;
