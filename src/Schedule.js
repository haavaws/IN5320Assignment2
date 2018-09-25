import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleGroupList from "./ScheduleGroupList";

function Schedule(props) {
  return (
    <section className="Schedule">
      <ScheduleHeader courseCode={props.courseCode} />
      <ScheduleGroupList
        schedule={props.schedule}
        groupTitle={props.groupTitle}
        clickHandler={props.clickHandler}
      />
    </section>
  );
}

export default Schedule;
