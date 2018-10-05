import React from "react";

/**
 * Component for showing the header of the schedule section
 */
function ScheduleHeader(props) {
  var numEvents = 0;
  var numSelectedEvents = 0;
  for (const scheduleGroup of props.schedule) {
    numEvents += scheduleGroup.events.length;
  }
  for (const selectedScheduleGroup of props.selectedEvents) {
    numSelectedEvents += selectedScheduleGroup.events.length;
  }
  return (
    <section className="ScheduleHeader">
      {/* Button for closing the course schedule */}
      <img
        className="backButton"
        onClick={props.handleBackClick}
        alt="select all"
        src={require("/img/BackIcon.png")}
      />
      <h3>Schedule for {props.courseCode}</h3>
      {/* Button for selecting all events in the schedule, or deselecting
      if all are already selected */}
      <img
        className="checkmark"
        onClick={props.selectAllClickHandler}
        alt="select all"
        src={
          (numEvents === numSelectedEvents &&
            require("/img/CheckedCheckmarkSmall.png")) ||
          require("/img/UncheckedCheckmarkSmall.png")
        }
      />
    </section>
  );
}

export default ScheduleHeader;
