import React from "react";

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

function getTime(dateObj) {
  var min = dateObj.getMinutes();
  var hr = dateObj.getHours();
  if (min < 10) min = "0" + min;
  if (hr < 10) hr = "0" + hr;
  const time = hr + ":" + min;
  return time;
}

function ScheduleEvent(props) {
  return (
    <li
      className={
        (props.selected && "ScheduleEvent selectedEvent") || "ScheduleEvent"
      }
      onClick={props.eventClickHandler}
    >
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
