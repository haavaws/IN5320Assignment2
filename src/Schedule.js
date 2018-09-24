import React from "react";
import ScheduleEvent from "./ScheduleEvent";

function Schedule(props) {
  return (
    <section className="Schedule">
      {console.log(props.schedule)}
      {/*props.schedule.map((event, index) => {
        <ScheduleEvent event={event} key={index} />;
      })*/}
    </section>
  );
}

export default Schedule;
