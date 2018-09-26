import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleGroupList from "./ScheduleGroupList";

function Schedule(props) {
  return (
    <section className="Schedule">
      <ScheduleHeader courseCode={props.courseCode} />
      <ScheduleGroupList
        activeGroupClickHandler={props.activeGroupClickHandler}
        schedule={props.schedule}
        groupTitle={props.groupTitle}
        scheduleGroupClickHandler={props.scheduleGroupClickHandler}
      />
    </section>
  );
}

export default Schedule;
