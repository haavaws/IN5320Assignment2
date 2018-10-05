import React from "react";
import SubmitOverlayContentFooter from "./SubmitOverlayContentFooter";
import SubmitOverlayContentBody from "./SubmitOverlayContentBody";
import SubmitOverlayContentHeader from "./SubmitOverlayContentHeader";

class SubmitOverlayContent extends React.Component {
  dontCancelOnClick = event => {
    event.stopPropagation();
  };

  render() {
    if (this.props.calendarEvents.length === 0)
      return (
        <section
          onClick={this.dontCancelOnClick}
          className="SubmitOverlayContent overlayContentAlt"
        >
          <p>No selected events</p>
          <button onClick={this.props.handleCancelSubmitClick}>Cancel</button>
        </section>
      );
    if (this.props.submitting) {
      return (
        <section
          style={{ textAlign: "center" }}
          className="SubmitOverlayContent"
        >
          <p style={{ fontWeight: "bold" }}>Submitting events...</p>
          <img alt="loading" src={require("/img/EclipseLoading.svg")} />
        </section>
      );
    }
    if (this.props.submitted) {
      return (
        <section
          onClick={this.dontCancelOnClick}
          className="SubmitOverlayContent"
        >
          <p style={{ fontWeight: "bold", margin: "30px" }}>
            All events have been added to your calendar!
          </p>
          <img src={require("/img/CheckedCheckmark.png")} alt="checkmark" />
        </section>
      );
    }
    return (
      <section
        onClick={this.dontCancelOnClick}
        className="SubmitOverlayContent"
      >
        <SubmitOverlayContentHeader
          courseCode={this.props.courseCode}
          handleCancelSubmitClick={this.props.handleCancelSubmitClick}
        />
        <SubmitOverlayContentBody
          calendarsPending={this.props.calendarsPending}
          calendarId={this.props.calendarId}
          calendarChangeHandler={this.props.calendarChangeHandler}
          calendars={this.props.calendars}
          calendarEvents={this.props.calendarEvents}
        />
        <SubmitOverlayContentFooter
          handleSubmitClick={this.props.handleSubmitClick}
          handleCancelSubmitClick={this.props.handleCancelSubmitClick}
        />
      </section>
    );
  }
}

export default SubmitOverlayContent;
