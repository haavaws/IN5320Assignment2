import React from "react";

function ScheduleEvent(props) {
  return (
    <li className="ScheduleEvent">
      <p>{props.event.title}</p>
      <div className="border" />
    </li>
  );
}

export default ScheduleEvent;
