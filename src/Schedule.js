import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleEvent from "./ScheduleEvent";

function Schedule(props) {
  return (
    <section className="Schedule">
      <ScheduleHeader />
      {console.log(props.schedule)}
      {props.schedule.map((event, index) => {
        return <ScheduleEvent event={event} key={index} />;
      })}
    </section>
  );
}

export default Schedule;
