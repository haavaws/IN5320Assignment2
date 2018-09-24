import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleEventList from "./ScheduleEventList";

function Schedule(props) {
  return (
    <section className="Schedule">
      <ScheduleHeader courseCode={props.courseCode} />
      <ScheduleEventList schedule={props.schedule} />
    </section>
  );
}

export default Schedule;
