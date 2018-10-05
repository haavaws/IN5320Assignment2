import React from "react";
import SubmitOverlayContent from "./SubmitOverlayContent";

class SubmitOverlay extends React.Component {
  state = { calendars: [], calendarsPending: true };

  async componentDidMount() {
    var request = window.gapi.client.calendar.calendarList.list();
    var calendars = [];

    var requestPromises = [];

    await request.then(response => {
      var i;
      for (i = 0; i < response.result.items.length; i++) {
        var request2 = window.gapi.client.calendar.calendarList.get({
          calendarId: response.result.items[i].id
        });
        requestPromises.push(request2);
      }
    });

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

  render() {
    if (
      this.props.reviewingEvents ||
      this.props.submitting ||
      this.props.submitted
    ) {
      return (
        <section
          onClick={!this.props.submitting && this.props.handleCancelSubmitClick}
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
