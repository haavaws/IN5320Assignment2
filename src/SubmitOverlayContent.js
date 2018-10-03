import React from "react";
import SubmitOverlayContentFooter from "./SubmitOverlayContentFooter";
import SubmitOverlayContentBody from "./SubmitOverlayContentBody";
import SubmitOverlayContentHeader from "./SubmitOverlayContentHeader";

class SubmitOverlayContent extends React.Component {
  render() {
    if (this.props.calendarEvents.length === 0)
      return (
        <section className="SubmitOverlayContent overlayContentAlt">
          <p>No selected events</p>
          <button onClick={this.props.handleCancelSubmitClick}>Cancel</button>
        </section>
      );
    return (
      <section className="SubmitOverlayContent">
        <SubmitOverlayContentHeader
          courseCode={this.props.courseCode}
          handleCancelSubmitClick={this.props.handleCancelSubmitClick}
        />
        <SubmitOverlayContentBody calendarEvents={this.props.calendarEvents} />
        <SubmitOverlayContentFooter
          handleSubmitClick={this.props.handleSubmitClick}
        />
      </section>
    );
  }
}

export default SubmitOverlayContent;
