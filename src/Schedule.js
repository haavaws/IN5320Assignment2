import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleGroupList from "./ScheduleGroupList";
import Loader from "./Loader";

class Schedule extends React.Component {
  state = {
    courseCode: "",
    schedule: [],
    groupTitle: "",
    selectedEvents: [],
    schedulePending: false
  };

  componentWillMount(props) {
    this.getSchedule();
  }

  scheduleEventClickHandler = event => {
    event.stopPropagation();

    var i;
    var j;

    var newSelectedGroupEvents;
    var newSelectedEvents = Array.from(this.state.selectedEvents);

    const groupTitle =
      event.currentTarget.parentNode.parentNode.childNodes[0].innerHTML;

    const eventTitle = event.currentTarget.childNodes[0].innerHTML;
    const dtStart = event.currentTarget.childNodes[1].innerHTML;
    const dtEnd = event.currentTarget.childNodes[2].innerHTML;
    const buildingName = event.currentTarget.childNodes[3].innerHTML;
    const roomName = event.currentTarget.childNodes[4].innerHTML;

    for (i = 0; i < newSelectedEvents.length; i++) {
      /* Check if there are any selected events from the same group */
      if (newSelectedEvents[i].groupTitle === groupTitle) {
        newSelectedGroupEvents = Array.from(newSelectedEvents[i].events);

        for (j = 0; j < newSelectedEvents[i].events.length; j++) {
          /* Check if the event is already selected, and deselect it if it is */
          if (newSelectedEvents[i].events[j].dtStart === dtStart) {
            newSelectedGroupEvents.splice(j, 1);
            if (newSelectedGroupEvents.length === 0) {
              newSelectedEvents.splice(i, 1);
            } else {
              newSelectedEvents[i] = {
                groupTitle: groupTitle,
                events: newSelectedGroupEvents
              };
            }
            this.setState({ selectedEvents: newSelectedEvents });
            return;
          }
        }

        /* Add the event to the selected events if it wasn't already selected */
        newSelectedGroupEvents.push({
          eventTitle,
          dtStart,
          dtEnd,
          buildingName,
          roomName
        });
        newSelectedEvents[i] = {
          groupTitle: newSelectedEvents[i].groupTitle,
          events: newSelectedGroupEvents
        };
        this.setState({ selectedEvents: newSelectedEvents });
        return;
      }
    }

    /* If no events from the group had been selected previously, add an entry
    for the group and add the event to the selected events */
    newSelectedGroupEvents = {
      groupTitle,
      events: [
        {
          eventTitle,
          dtStart,
          dtEnd,
          buildingName,
          roomName
        }
      ]
    };
    newSelectedEvents.push(newSelectedGroupEvents);
    this.setState({ selectedEvents: newSelectedEvents });
  };

  scheduleGroupClickHandler = async event => {
    const groupTitle = event.currentTarget.childNodes[0].innerHTML;
    this.setState({ groupTitle: groupTitle });
  };

  clearGroupSchedule = () => {
    this.setState({ groupTitle: "" });
  };

  sortSchedules = schedule => {
    var scheduleGroups = [];
    var i;
    var j;

    /* Categories the schedule events */
    for (i = 0; i < schedule.length; i++) {
      for (j = 0; j < scheduleGroups.length; j++) {
        if (schedule[i].activityTitle === scheduleGroups[j].activityTitle) {
          scheduleGroups[j].events.push(schedule[i]);
          break;
        }
      }
      if (j === scheduleGroups.length) {
        scheduleGroups.push({});
        scheduleGroups[j].activityTitle = schedule[i].activityTitle;
        scheduleGroups[j].events = [];
        scheduleGroups[j].events.push(schedule[i]);
      }
    }

    /* Sort the categories according to their names */
    for (i = 0; i < scheduleGroups.length; i++) {
      for (j = 0; j < scheduleGroups.length - 1; j++) {
        if (
          scheduleGroups[j].activityTitle > scheduleGroups[j + 1].activityTitle
        ) {
          var tmp = scheduleGroups[j];
          scheduleGroups[j] = scheduleGroups[j + 1];
          scheduleGroups[j + 1] = tmp;
        }
      }
    }
    return scheduleGroups;
  };

  getSchedule = async () => {
    this.setState({
      courseCode: this.props.courseCode,
      schedule: [],
      schedulePending: true,
      selectedEvents: [],
      groupTitle: ""
    });
    try {
      var year = this.props.year;
      while (year >= 100) {
        year -= 100;
      }
      const response = await fetch(
        "https://data.uio.no/studies/v1/course/" +
          this.props.courseCode +
          "/semester/" +
          year +
          this.props.semester +
          "/schedule"
      );
      const schedule = (await response.json()).events;
      const scheduleGroups = await this.sortSchedules(schedule);
      this.setState({
        schedule: scheduleGroups,
        schedulePending: false
      });
    } catch (e) {
      console.log("Failed to fetch course schedule!");
      console.log(e.message);
    }
  };

  render() {
    if (!(this.state.courseCode === this.props.courseCode)) this.getSchedule();

    return (
      <section className="Schedule">
        <ScheduleHeader courseCode={this.props.courseCode} />
        {(!this.state.schedulePending && (
          <ScheduleGroupList
            activeGroupClickHandler={this.clearGroupSchedule}
            schedule={this.state.schedule}
            groupTitle={this.state.groupTitle}
            selectedEvents={this.state.selectedEvents}
            scheduleGroupClickHandler={this.scheduleGroupClickHandler}
            scheduleEventClickHandler={this.scheduleEventClickHandler}
          />
        )) || <Loader />}
      </section>
    );
  }
}

export default Schedule;
