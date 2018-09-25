import React from "react";
import ScheduleEventList from "./ScheduleEventList";

function ScheduleGroup(props) {
  return (
    <section onClick={props.clickHandler} grouptitle={props.activityTitle}>
      <li className="ScheduleGroup">
        <p>{props.activityTitle}</p>
        <div className="border" />
        {props.groupTitle === props.activityTitle && (
          <ScheduleEventList groupSchedule={props.groupSchedule} />
        )}
      </li>
    </section>
  );
}

export default ScheduleGroup;
