import React from "react";
import ScheduleEventList from "./ScheduleEventList";

function ScheduleGroup(props) {
  return (
    <section
      onClick={
        (props.groupTitle === props.activityTitle &&
          props.activeGroupClickHandler) ||
        props.scheduleGroupClickHandler
      }
    >
      <li className="ScheduleGroup">
        <p className="ScheduleGroupTitle">{props.activityTitle}</p>
        <div className="border" />
        {props.groupTitle === props.activityTitle && (
          <ScheduleEventList groupSchedule={props.groupSchedule} />
        )}
      </li>
    </section>
  );
}

export default ScheduleGroup;
