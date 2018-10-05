import React from "react";
import SubmitOverlayContent from "./SubmitOverlayContent";

/**
 * Component for showing the dialog for submitting the selected events to the Google Calendar
 */
class SubmitOverlay extends React.Component {
  state = {
    calendars: [] /* All calendars in the users Google Calendar */,
    calendarsPending: true /* Have the calendars been fetched yet */
  };

  /* Fetch calendars from the users Google Calendar on mount */
  async componentDidMount() {
    /* Request the calendars from the Google API */
    var request = window.gapi.client.calendar.calendarList.list();
    var calendars = [];
    var requestPromises = [];

    /* Request specifics from all retrieved calendars */
    await request.then(response => {
      var i;
      for (i = 0; i < response.result.items.length; i++) {
        var request2 = window.gapi.client.calendar.calendarList.get({
          calendarId: response.result.items[i].id
        });
        requestPromises.push(request2);
      }
    });

    /* Wait for all calendar requests to resolve and store the results */
    Promise.all(requestPromises).then(async responses => {
      for (const response of responses) {
        const calendar = {
          id: response.result.id,
          accessRole: response.result.accessRole,
          summary: response.result.summary,
          primary: response.result.primary
        };
        calendars.push(calendar);
      }
      this.setState({ calendars: calendars, calendarsPending: false });
    });
  }

  /**
   * Render the dialog
   */
  render() {
    /* Only render if the user has clicked the "Add to calendar" button, the
    app is submitting events to the Google Calendar, or the events have just been submitted */
    if (
      this.props.reviewingEvents ||
      this.props.submitting ||
      this.props.submitted
    ) {
      return (
        <section
          onClick={
            (!this.props.submitting && this.props.handleCancelSubmitClick) ||
            (() => {})
          }
          className="SubmitOverlay"
        >
          <SubmitOverlayContent
            submitting={this.props.submitting}
            submitted={this.props.submitted}
            calendarId={this.props.calendarId}
            calendarChangeHandler={this.props.calendarChangeHandler}
            calendars={this.state.calendars}
            courseCode={this.props.courseCode}
            calendarEvents={this.props.calendarEvents}
            handleCancelSubmitClick={this.props.handleCancelSubmitClick}
            handleSubmitClick={this.props.handleSubmitClick}
            calendarsPending={this.state.calendarsPending}
          />
        </section>
      );
    }
  }
}

export default SubmitOverlay;
