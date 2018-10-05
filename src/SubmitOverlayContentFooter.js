import React from "react";

class SubmitOverlayContentFooter extends React.Component {
  render() {
    return (
      <section className="SubmitOverlayContentFooter">
        <button onClick={this.props.handleSubmitClick}>Submit</button>
        <button onClick={this.props.handleCancelSubmitClick}>Cancel</button>
      </section>
    );
  }
}

export default SubmitOverlayContentFooter;
