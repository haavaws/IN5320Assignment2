import React from "react";

class SubmitOverlayContentBody extends React.Component {
  render() {
    var i, j;
    var numEvents = 0;
    for (i = 0; i < this.props.calendarEvents.length; i++) {
      numEvents += this.props.calendarEvents[i].events.length;
    }
    return (
      <section className="SubmitOverlayContentBody">
        <section>
          <button>Submit</button>
          <p>Add {numEvents} events to you Google Calendar?</p>
          <ul>
            {this.props.calendarEvents.map(group => {
              return (
                <li key={group.groupTitle}>
                  <p>{group.groupTitle}</p>
                  <ul>
                    {group.events.map(event => {
                      return <li key={event.dtStart}>{event.eventTitle}</li>;
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    );
  }
}

export default SubmitOverlayContentBody;
