import React from "react";

/**
 * Component for showing a loading overlay where content is waiting to be loaded
 */
class LoadingOverlay extends React.Component {
  render() {
    return (
      <section className="LoadingOverlay">
        <img alt="Loading graphic" src={require("/img/EclipseLoading.svg")} />
      </section>
    );
  }
}

export default LoadingOverlay;
