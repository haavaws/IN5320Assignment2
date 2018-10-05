import React from "react";
import ScheduleEventList from "./ScheduleEventList";

class ScheduleGroup extends React.Component {
  render() {
    var i;
    var selectedGroupEvents = [];
    for (i = 0; i < this.props.selectedEvents.length; i++) {
      if (
        this.props.selectedEvents[i].activityTitle === this.props.groupTitle
      ) {
        selectedGroupEvents = this.props.selectedEvents[i].events;
      }
    }
    const numEvents = this.props.groupSchedule.length;
    const numSelectedEvents = selectedGroupEvents.length;
    return (
      <li
        className={
          (selectedGroupEvents.length === this.props.groupSchedule.length &&
            "ScheduleGroup allEventsSelected") ||
          (selectedGroupEvents.length > 0 &&
            "ScheduleGroup someEventsSelected") ||
          "ScheduleGroup"
        }
        onClick={
          (this.props.selectedGroupTitle === this.props.groupTitle &&
            this.props.activeGroupClickHandler) ||
          this.props.groupClickHandler
        }
      >
        <span className="scheduleGroupHeader">
          <p className="scheduleGroupTitle">{this.props.groupTitle}</p>
          <img
            className="checkmark"
            onClick={this.props.selectAllGroupEventsClickHandler}
            alt="select all"
            src={
              (numEvents === numSelectedEvents &&
                require("./img/CheckedCheckmarkSmall.png")) ||
              require("/img/UncheckedCheckmarkSmall.png")
            }
          />
        </span>
        {this.props.selectedGroupTitle === this.props.groupTitle && (
          <ScheduleEventList
            groupSchedule={this.props.groupSchedule}
            selectedEvents={selectedGroupEvents}
            eventClickHandler={this.props.eventClickHandler}
          />
        )}
      </li>
    );
  }
}

export default ScheduleGroup;
