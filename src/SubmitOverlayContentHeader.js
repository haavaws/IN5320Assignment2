import React from "react";

class SubmitOverlayContentHeader extends React.Component {
  render() {
    return (
      <section className="SubmitOverlayContentHeader">
        <section>
          <span>
            {" "}
            <p>Submit selected Events for {this.props.courseCode}</p>
            <button onClick={this.props.handleCancelSubmitClick}>Cancel</button>
          </span>
        </section>
      </section>
    );
  }
}

export default SubmitOverlayContentHeader;
