import React from "react";

class SubmitOverlayContentFooter extends React.Component {
  render() {
    return (
      <section className="SubmitOverlayContentFooter">
        <button onClick={this.props.handleSubmitClick}>Submit</button>
      </section>
    );
  }
}

export default SubmitOverlayContentFooter;
