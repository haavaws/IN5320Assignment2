import React from "react";

function ScheduleEvent(props) {
  return (
    <li className="ScheduleEvent">
      <p>{props.activityTitle}</p>
      <div className="border" />
    </li>
  );
}

export default ScheduleEvent;
