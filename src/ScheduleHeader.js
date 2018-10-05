import React from "react";

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
      <img
        className="backButton"
        onClick={props.handleBackClick}
        alt="select all"
        src={require("/img/BackIcon.png")}
      />
      <h3>Schedule for {props.courseCode}</h3>
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
