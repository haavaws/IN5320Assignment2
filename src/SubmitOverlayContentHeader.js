import React from "react";

/**
 * Component showing the header of the submission dialog
 */
class SubmitOverlayContentHeader extends React.Component {
  render() {
    return (
      <section className="SubmitOverlayContentHeader">
        <p>Submit selected events for {this.props.courseCode}</p>
        <img
          src={require("/img/CancelX.png")}
          alt="Cancel"
          className="cancelX"
          onClick={this.props.handleCancelSubmitClick}
        />
      </section>
    );
  }
}

export default SubmitOverlayContentHeader;
