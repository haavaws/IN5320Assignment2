import React from "react";
import ScheduleEventList from "./ScheduleEventList";

class ScheduleGroup extends React.Component {
  render() {
    var i;
    var selectedGroupEvents = [];
    for (i = 0; i < this.props.selectedEvents.length; i++) {
      if (this.props.selectedEvents[i].groupTitle === this.props.groupTitle) {
        selectedGroupEvents = this.props.selectedEvents[i].events;
      }
    }
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
        <p className="data">{this.props.groupTitle}</p>
        <p className="ScheduleGroupTitle">{this.props.groupTitle}</p>
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
