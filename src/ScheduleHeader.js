import React from "react";

function ScheduleHeader(props) {
  return (
    <section className="ScheduleHeader">
      <h3>Schedule for {props.courseCode}</h3>
    </section>
  );
}

export default ScheduleHeader;
