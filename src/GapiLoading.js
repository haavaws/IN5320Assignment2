import React from "react";

/**
 * Component for showing loading screen when the Google API is still loading
 */
class GapiLoading extends React.Component {
  render() {
    return (
      <section className="GapiLoading">
        <span>
          <p>Attempting to load Google API</p>
          <p>If loading persists, try refreshing...</p>
          <p>Remember to activate scripts!</p>
        </span>
        <img alt="Loading graphic" src={require("/img/PacmanLoading.svg")} />
      </section>
    );
  }
}

export default GapiLoading;
