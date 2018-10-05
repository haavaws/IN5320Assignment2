import React from "react";

class SubmitOverlayContentBody extends React.Component {
  render() {
    var i;
    var numEvents = 0;

    for (i = 0; i < this.props.calendarEvents.length; i++) {
      numEvents += this.props.calendarEvents[i].events.length;
    }

    for (i = 0; i < this.props.calendars.length; i++) {
      if (this.props.calendars[i].primary) break;
    }

    return (
      <section className="SubmitOverlayContentBody">
        <section>
          <p>Which calendar do you wish to add the events to?</p>
          {(this.props.calendarsPending && (
            <img
              alt="loading calendars..."
              src={require("/img/PacmanLoading.svg")}
            />
          )) ||
            (this.props.calendars.length > 0 && (
              <select
                onChange={this.props.calendarChangeHandler}
                value={
                  (this.props.calendarId === "primary" &&
                    this.props.calendars[i].id) ||
                  this.props.calendarId
                }
              >
                {this.props.calendars.map(calendar => {
                  if (
                    calendar.accessRole === "owner" ||
                    calendar.accessRole === "writer"
                  ) {
                    return (
                      <option key={calendar.id} value={calendar.id}>
                        {(calendar.primary && "Primary") || calendar.summary}
                      </option>
                    );
                  } else return null;
                })}
              </select>
            ))}
          <p>Add {numEvents} events to your Google Calendar?</p>
        </section>
      </section>
    );
  }
}

export default SubmitOverlayContentBody;
