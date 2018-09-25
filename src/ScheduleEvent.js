import React from "react";

function getDate(dateObj) {
  var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  var months = [
    "Jan",
    "Feb",
    "Marh",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Augt",
    "Sep",
    "Oct",
    "Nov",
    "Dece"
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
    <li className="ScheduleEvent">
      <p className="EventTitle">{props.event.title}</p>
      <p>
        {getDate(new Date(props.event.dtStart)) +
          " " +
          getTime(new Date(props.event.dtStart)) +
          "-" +
          getTime(new Date(props.event.dtEnd))}
      </p>
      <div className="border" />
    </li>
  );
}

export default ScheduleEvent;
