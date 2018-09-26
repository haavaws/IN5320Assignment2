import React from "react";
import ScheduleGroup from "./ScheduleGroup";

function ScheduleGroupList(props) {
  return (
    <section className="ScheduleGroupList">
      {props.schedule.map((category, index) => {
        return (
          <ScheduleGroup
            activeGroupClickHandler={props.activeGroupClickHandler}
            scheduleGroupClickHandler={props.scheduleGroupClickHandler}
            key={category.activityTitle}
            activityTitle={category.activityTitle}
            groupTitle={props.groupTitle}
            groupSchedule={category.events}
          />
        );
      })}
    </section>
  );
}

export default ScheduleGroupList;
