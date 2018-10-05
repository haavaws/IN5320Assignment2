import React from "react";
import ScheduleEvent from "./ScheduleEvent";

/**
 * Component for showing all events in a single group schedule
 */
function ScheduleEventList(props) {
  return (
    <section className="ScheduleEventList">
      {props.groupSchedule.map((event, index) => {
        var i;
        var selected = false;
        for (i = 0; i < props.selectedEvents.length; i++) {
          if (props.selectedEvents[i].dtStart === event.dtStart) {
            selected = true;
          }
        }
        return (
          <ScheduleEvent
            key={index}
            event={event}
            eventClickHandler={props.eventClickHandler}
            selected={selected}
          />
        );
      })}
    </section>
  );
}

export default ScheduleEventList;
