import React from "react";
import ScheduleGroup from "./ScheduleGroup";

function ScheduleGroupList(props) {
  return (
    <section className="ScheduleGroupList">
      {/*console.log(props.schedule)*/}
      {props.schedule.map((category, index) => {
        return (
          <ScheduleGroup
            clickHandler={props.clickHandler}
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
