import React from "react";

/**
 * Style the date to: WW dd. MMM
 * where WW is first two weekday letters
 * dd is date in numbers
 * MMM is three first month letters
 */
function getDate(dateObj) {
  var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const date =
    days[dateObj.getDay()] +
    ". " +
    dateObj.getDate() +
    ". " +
    months[dateObj.getMonth()];
  return date;
}

/**
 * Style the hours and minutes of a date as: HH:MM
 * Where HH is hours and MM is minutes
 */
function getTime(dateObj) {
  var min = dateObj.getMinutes();
  var hr = dateObj.getHours();
  if (min < 10) min = "0" + min;
  if (hr < 10) hr = "0" + hr;
  const time = hr + ":" + min;
  return time;
}

/**
 * Component for showing a single event in the schedule
 */
function ScheduleEvent(props) {
  /* Change styling if the event has been selected */
  return (
    <li
      className={
        (props.selected && "ScheduleEvent selectedEvent") || "ScheduleEvent"
      }
      onClick={props.eventClickHandler}
    >
      {/* Store the data for the event */}
      <p className="data">{JSON.stringify(props.event)}</p>
      <p className="EventTitle">{props.event.title}</p>
      {props.event.dtStart &&
        props.event.dtEnd && (
          <span className="eventDateTime">
            <span>
              <p>{getDate(new Date(props.event.dtStart))}</p>
              <span className="eventTime">
                <p>{getTime(new Date(props.event.dtStart))}</p>-
                <p>{getTime(new Date(props.event.dtEnd))}</p>
              </span>
            </span>
          </span>
        )}
      {props.event.rooms && (
        <span className="eventLocation">
          <p>{props.event.rooms[0].buildingName}</p>
          <p>{props.event.rooms[0].roomName}</p>
        </span>
      )}
    </li>
  );
}

export default ScheduleEvent;
