import React from "react";

class GapiLoading extends React.Component {
  render() {
    return (
      <section className="GapiLoading">
        <span>
          <p>Attempting to load Google API</p>
          <p>If loading persists, try refreshing...</p>
        </span>
        <img alt="Loading graphic" src={require("/img/PacmanLoading.svg")} />
      </section>
    );
  }
}

export default GapiLoading;
