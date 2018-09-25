import React from "react";
import ScheduleEvent from "./ScheduleEvent";

function ScheduleEventList(props) {
  return (
    <section className="ScheduleEventList">
      {props.groupSchedule.map((event, index) => {
        return <ScheduleEvent key={index} event={event} />;
      })}
    </section>
  );
}

export default ScheduleEventList;
