import React from "react";
import ScheduleEventList from "./ScheduleEventList";

/**
 * Component for showing a single schedule group
 * Contains a list component with all associated events
 */
class ScheduleGroup extends React.Component {
  render() {
    var i;
    var selectedGroupEvents = [];

    /* Check how many of its associated events have been selected */
    for (i = 0; i < this.props.selectedEvents.length; i++) {
      if (
        this.props.selectedEvents[i].activityTitle === this.props.groupTitle
      ) {
        selectedGroupEvents = this.props.selectedEvents[i].events;
      }
    }

    const numEvents = this.props.groupSchedule.length;
    const numSelectedEvents = selectedGroupEvents.length;

    /* Change styling depending on how many of its associated events have been selected */
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
          {/* Button for selecting all associated events */}
          <img
            className="checkmark"
            onClick={this.props.selectAllGroupEventsClickHandler}
            alt="select all"
            src={
              (numEvents === numSelectedEvents &&
                require("/img/CheckedCheckmarkSmall.png")) ||
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
