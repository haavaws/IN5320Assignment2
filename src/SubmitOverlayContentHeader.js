import React from "react";

class SubmitOverlayContentHeader extends React.Component {
  render() {
    return (
      <section className="SubmitOverlayContentHeader">
        <p>Submit selected events for {this.props.courseCode}</p>
        <img
          src={require("./CancelX.png")}
          alt="Cancel"
          className="cancelX"
          onClick={this.props.handleCancelSubmitClick}
        />
      </section>
    );
  }
}

export default SubmitOverlayContentHeader;
