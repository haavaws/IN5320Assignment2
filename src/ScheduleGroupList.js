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
            scheduleEventClickHandler={props.scheduleEventClickHandler}
            key={category.activityTitle}
            groupTitle={category.activityTitle}
            selectedGroupTitle={props.groupTitle}
            groupSchedule={category.events}
            selectedEvents={props.selectedEvents}
          />
        );
      })}
    </section>
  );
}

export default ScheduleGroupList;
