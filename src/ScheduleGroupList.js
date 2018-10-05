import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import ScheduleGroup from "./ScheduleGroup";

function ScheduleGroupList(props) {
  return (
    <section className="ScheduleGroupList">
      {props.pending && <LoadingOverlay />}
      {props.schedule.map((category, index) => {
        return (
          <ScheduleGroup
            selectAllGroupEventsClickHandler={
              props.selectAllGroupEventsClickHandler
            }
            activeGroupClickHandler={props.activeGroupClickHandler}
            groupClickHandler={props.groupClickHandler}
            eventClickHandler={props.eventClickHandler}
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
