import React from "react";

class GapiLoadingOverlay extends React.Component {
  render() {
    return (
      <section className="GapiLoadingOverlay">
        <section
          style={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "10px"
          }}
          className="gapiLoadingOverlayContent overlayContentAlt"
        >
          <p>Attempting to load Google API</p>
          <p>If loading persists, try refreshing...</p>
          <img alt="Loading graphic" src={require("./EclipseLoading.svg")} />
        </section>
      </section>
    );
  }
}

export default GapiLoadingOverlay;
