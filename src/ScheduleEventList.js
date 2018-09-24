import React from "react";
import ScheduleEvent from "./ScheduleEvent";

function ScheduleEventList(props) {
  return (
    <section className="ScheduleEventList">
      {/*console.log(props.schedule)*/}
      {props.schedule.map((category, index) => {
        return (
          <ScheduleEvent
            key={category.activityTitle}
            activityTitle={category.activityTitle}
          />
        );
      })}
    </section>
  );
}

export default ScheduleEventList;
