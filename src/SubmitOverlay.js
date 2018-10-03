import React from "react";
import SubmitOverlayContent from "./SubmitOverlayContent";

class SubmitOverlay extends React.Component {
  render() {
    return (
      <section className="SubmitOverlay">
        <SubmitOverlayContent
          courseCode={this.props.courseCode}
          calendarEvents={this.props.calendarEvents}
          handleCancelSubmitClick={this.props.handleCancelSubmitClick}
          handleSubmitClick={this.props.handleSubmitClick}
        />
      </section>
    );
  }
}

export default SubmitOverlay;
