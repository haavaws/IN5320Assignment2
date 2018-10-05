import React from "react";
import ReactDOM from "react-dom";
import SubmitOverlay from "./SubmitOverlay";
import GoogleCalendar from "./GoogleCalendar";
import Courses from "./Courses";
import Schedule from "./Schedule";
import Footer from "./Footer";

import "./styles.css";

/**
 * Web application for adding schedule events from courses at
 * the University of Oslo to your Google Calendar
 */
class App extends React.Component {
  state = {
    /* The Google ID of the application used for interacting with the Google API */
    clientId:
      "474152757205-e909mipnlaeaq9d0h3235q3tkr3seu8r.apps.googleusercontent.com",
    /* The Google API key used for interacting with the Google API */
    apiKey: "AIzaSyBv7tgwtYl3MhKqllSzL6aQwt2Rr7UJzFQ",
    /* Specifies the Google API to be used */
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ],
    /* The scope of the application in regards to what
    permissions the application needs from Google */
    scope: "https://www.googleapis.com/auth/calendar",
    baseYear: 0 /* The current year */,
    year: "0" /* The year of the courses to query the UiO API for */,
    semester: "" /* The semester of the courses to query the UiO API for */,
    scheduleCourseCode:
      "" /* The currently selected course to show schedule for */,
    selectedEvents: [] /* All currently selected lecture events */,
    /* The ID of the calendar to add the events to, primary specifies the default calendar */
    calendarId: "primary",
    reviewingEvents: false /* Specifies if the user is currently in the submission dialog */,
    /* Specifies if the application is in the process of submitting the selected events to Google */
    submitting: false,
    submitted: false /* Specifies if the submission has just finished */,

    isAuthorized: false /* Is the user signed in? */,
    GoogleAuth: {} /* The Google authentication instance  */,
    gapiLoaded: false /* Has the Google API loaded correctly? */,
    gapiLoadFailed: false /* Did the Google API fail to load? */
  };

  /**
   * Handles the click of the button which submits the selected events to the Google Calendar
   * Loops through all events and asynchronously requests the Google API to insert them into
   * the users Google Calendar
   * Waits for response from all requests before notifying user of success
   */
  handleSubmitClick = async () => {
    await this.setState({ reviewingEvents: false, submitting: true });

    var i, j;
    const selectedEvents = this.state.selectedEvents;
    var addEventPromises = []; /* Store the request promises */

    /* Loop through all events and send the requests */
    for (i = 0; i < selectedEvents.length; i++) {
      const eventGroup = selectedEvents[i];
      for (j = 0; j < eventGroup.events.length; j++) {
        const selectedEvent = eventGroup.events[j];
        const event = {
          summary: selectedEvent.courseId + ": " + eventGroup.activityTitle,
          description: selectedEvent.title,
          location:
            selectedEvent.rooms[0].buildingName +
            " " +
            selectedEvent.rooms[0].roomName,
          start: {
            dateTime: selectedEvent.dtStart
          },
          end: {
            dateTime: selectedEvent.dtEnd
          }
        };
        var request = window.gapi.client.calendar.events.insert({
          calendarId: this.state.calendarId,
          resource: event
        });
        addEventPromises.push(request);
      }
    }

    /* Wait for all the request promises to resolve */
    await Promise.all(addEventPromises).then(responses => {});

    await this.setState({ submitting: false, submitted: true });

    /* Notify user for three seconds */
    setTimeout(() => {
      this.setState({
        submitted: false,
        selectedEvents: [],
        calendarId: "primary"
      });
    }, 2000);
  };

  /**
   * Handles the change in the DDL of calendars the user can submit events to
   */
  calendarChangeHandler = event => {
    this.setState({ calendarId: event.target.value });
  };

  /**
   * Handles the change in the DDL of the years for which to retrieve courses
   */
  yearChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ year: event.target.value });
  };

  /**
   * Handles the change in the DDL of the semster for which to retrieve courses
   */
  semesterChangeHandler = event => {
    this.setState({ semester: event.target.value });
  };

  /**
   * Clear the course and schedule when the course is no longer selected
   */
  clearSchedule = () => {
    this.setState({
      selectedEvents: [],
      scheduleCourseCode: ""
    });
  };

  /**
   * Handle the button which opens the event submission dialog
   */
  handleAddToCalendarClick = () => {
    this.setState({ reviewingEvents: true });
  };

  /**
   * Handle exit from the submission dialog, clear calendar selection
   */
  handleCancelSubmitClick = () => {
    this.setState({
      reviewingEvents: false,
      submitted: false,
      calendarId: "primary"
    });
  };

  /**
   * Handle the click of courses in the course list,
   * this change triggers the schedule of the course to be retrieved and appear
   */
  courseClickHandler = async event => {
    const courseCode = event.currentTarget.childNodes[0].innerHTML;
    this.setState({
      selectedEvents: [],
      scheduleCourseCode: courseCode
    });
  };

  /**
   * Handle keypress in the course search field.
   * On enter, attempt to retrieve a course with code equal to the current text in the search field.
   */
  onKeyPressInputField = event => {
    if (event.key === "Enter") {
      const courseCode = event.target.value;
      this.setState({ scheduleCourseCode: courseCode });
    }
  };

  /**
   * Handles the click of events in the schedule.
   * Adds the clicked event to the selected events if it isn't already selected,
   * and deselects it if it is.
   */
  scheduleEventClickHandler = async event => {
    event.stopPropagation();

    /* Get stored event data */
    var scheduleEvent = JSON.parse(event.currentTarget.childNodes[0].innerHTML);

    var i;
    var j;

    /* Get shallowly mutable version of stored state selected events */
    var newSelectedGroupEvents;
    var newSelectedEvents = Array.from(this.state.selectedEvents);

    /* Loop through events and check if any events from the same schedule group exists,
  and if the clicked event exists. Add the event to the schedule group if there are any
  preexisting in the group, and deselect the event if already was selected */
    for (i = 0; i < newSelectedEvents.length; i++) {
      /* Check if there are any selected events from the same group */
      if (newSelectedEvents[i].activityTitle === scheduleEvent.activityTitle) {
        newSelectedGroupEvents = Array.from(newSelectedEvents[i].events);

        for (j = 0; j < newSelectedEvents[i].events.length; j++) {
          /* Check if the event is already selected, and deselect it if it is */
          if (
            newSelectedEvents[i].events[j].dtStart === scheduleEvent.dtStart
          ) {
            newSelectedGroupEvents.splice(j, 1);
            if (newSelectedGroupEvents.length === 0) {
              newSelectedEvents.splice(i, 1);
            } else {
              newSelectedEvents[i] = {
                activityTitle: scheduleEvent.activityTitle,
                events: newSelectedGroupEvents
              };
            }

            this.setState({ selectedEvents: newSelectedEvents });
            return;
          }
        }

        /* Add the event to the selected events if it wasn't already selected */
        newSelectedGroupEvents.push(scheduleEvent);
        newSelectedEvents[i] = {
          activityTitle: newSelectedEvents[i].activityTitle,
          events: newSelectedGroupEvents
        };
        this.setState({ selectedEvents: newSelectedEvents });
        return;
      }
    }

    /* If no events from the group had been selected previously, add an entry
    for the group and add the event to the selected events */
    newSelectedGroupEvents = {
      activityTitle: scheduleEvent.activityTitle,
      events: [scheduleEvent]
    };
    newSelectedEvents.push(newSelectedGroupEvents);
    await this.setState({ selectedEvents: newSelectedEvents });
  };

  /* Handles the click of the check mark in the schedule header,
    makes all events in the schedule selected. */
  selectAllEvents = schedule => {
    var numEvents = 0;
    var numSelectedEvents = 0;
    for (const groupSchedule of schedule) {
      numEvents += groupSchedule.events.length;
    }
    for (const groupSelectedSchedule of this.state.selectedEvents) {
      numSelectedEvents += groupSelectedSchedule.events.length;
    }

    if (numEvents === numSelectedEvents) this.setState({ selectedEvents: [] });
    else this.setState({ selectedEvents: schedule });
  };

  /* Handles the click of the check mark in the group schedule box,
makes all events in that group schedule selected */
  selectAllGroupEvents = async groupSchedule => {
    /* If there are no events in the group schedule, don't do anything */
    const numGroupEvents = groupSchedule.events.length;
    if (numGroupEvents === 0) return;
    var numSelectedGroupEvents = 0;
    var newSelectedEvents;

    /* Check if all events are already selected */
    var i;
    for (i = 0; i < this.state.selectedEvents.length; i++) {
      if (
        this.state.selectedEvents[i].activityTitle ===
        groupSchedule.activityTitle
      ) {
        numSelectedGroupEvents = this.state.selectedEvents[i].events.length;
        break;
      }
    }
    /* IF all events are already selected, deselect all events, if not select all remaining events */
    if (numGroupEvents === numSelectedGroupEvents) {
      newSelectedEvents = Array.from(this.state.selectedEvents);
      newSelectedEvents.splice(i, 1);
      await this.setState({
        selectedEvents: newSelectedEvents
      });
    } else {
      newSelectedEvents = Array.from(this.state.selectedEvents);
      if (numSelectedGroupEvents > 0) {
        newSelectedEvents[i] = groupSchedule;
      } else newSelectedEvents.push(groupSchedule);
      await this.setState({ selectedEvents: newSelectedEvents });
    }
  };

  selectAllEvents = schedule => {
    var numEvents = 0;
    var numSelectedEvents = 0;
    for (const groupSchedule of schedule) {
      numEvents += groupSchedule.events.length;
    }
    for (const groupSelectedSchedule of this.state.selectedEvents) {
      numSelectedEvents += groupSelectedSchedule.events.length;
    }
    console.log(numEvents);
    console.log(numSelectedEvents);
    if (numEvents === numSelectedEvents) this.setState({ selectedEvents: [] });
    else this.setState({ selectedEvents: schedule });
  };

  selectAllGroupEvents = async groupSchedule => {
    const numGroupEvents = groupSchedule.events.length;
    if (numGroupEvents === 0) return;
    var numSelectedGroupEvents = 0;
    var newSelectedEvents;
    var i;
    for (i = 0; i < this.state.selectedEvents.length; i++) {
      if (
        this.state.selectedEvents[i].activityTitle ===
        groupSchedule.activityTitle
      ) {
        numSelectedGroupEvents = this.state.selectedEvents[i].events.length;
        break;
      }
    }
    console.log(numGroupEvents);
    console.log(numSelectedGroupEvents);
    console.log(i);
    if (numGroupEvents === numSelectedGroupEvents) {
      console.log("hei");
      newSelectedEvents = Array.from(this.state.selectedEvents);
      newSelectedEvents.splice(i, 1);
      await this.setState({
        selectedEvents: newSelectedEvents
      });
    } else {
      newSelectedEvents = Array.from(this.state.selectedEvents);
      if (numSelectedGroupEvents > 0) {
        newSelectedEvents[i] = groupSchedule;
      } else newSelectedEvents.push(groupSchedule);
      await this.setState({ selectedEvents: newSelectedEvents });
    }
    console.log(this.state.selectedEvents);
  };

  /* Code interacting with google services based on:
  https://developers.google.com/calendar/quickstart/js#step_2_set_up_the_sample */

  /* Initializes the Google API client library and sets up sign-in state listeners. */
  initClient = () => {
    window.gapi.client
      .init({
        apiKey: this.state.apiKey,
        clientId: this.state.clientId,
        discoveryDocs: this.state.discoveryDocs,
        scope: this.state.scope
      })
      .then(
        () => {
          // Listen for sign-in state changes.
          var GoogleAuth = window.gapi.auth2.getAuthInstance();
          GoogleAuth.isSignedIn.listen(this.updateSigninStatus);

          this.updateSigninStatus(GoogleAuth.isSignedIn.get());

          this.setState({ GoogleAuth: GoogleAuth, gapiLoaded: true });
        },
        e => {
          this.setState({ gapiLoaded: true });
          this.setState({ gapiLoadFailed: true });
        }
      );
  };

  /* Called when the signed in status changes, to update the UI appropriately.
  After a sign-in, the API is called. Also based on above */
  updateSigninStatus = isSignedIn => {
    if (isSignedIn) {
      this.setState({ isAuthorized: true });
    } else {
      this.setState({ isAuthorized: false });
    }
  };

  /* Sign the user in upon button click. Also based on above */
  handleAuthClick = async event => {
    try {
      await this.state.GoogleAuth.signIn();
    } catch (e) {
      /* Sign-in cancelled */
    }
  };

  /* Sign the out user upon button click. Removes persmission for the app to
  manage the users Google Calenar. Also based on above */
  handleSignoutClick = event => {
    this.state.GoogleAuth.signOut();
    this.state.GoogleAuth.disconnect();
  };

  /* When the app loads set the default semester to load courses for, and load the google api.*/
  componentDidMount() {
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var semester = date.getMonth();

    if (semester > 6) {
      semester = "h";
    } else semester = "v";

    this.setState({ baseYear: year, year: year.toString(), semester });

    /* Load the Google API */
    window.gapi.load("client:auth2", this.initClient);
  }

  /**
   * Render the web application
   * SubmitOverlay is only visible when the user clicks on the "Add to calendar" button
   * GoogleCalendar is the top section for interacting with the Google interface
   * Courses is the section for searching and listing courses from UiO
   * Schedule is the section listing the schedule from the selected course
   * Footer is the section containing acknowledgements of outside resources
   */
  render() {
    return (
      <section className="App">
        {(this.state.reviewingEvents ||
          this.state.submitting ||
          this.state.submitted) && (
          <SubmitOverlay
            calendarId={this.state.calendarId}
            calendarChangeHandler={this.calendarChangeHandler}
            courseCode={this.state.scheduleCourseCode}
            calendarEvents={this.state.selectedEvents}
            handleCancelSubmitClick={this.handleCancelSubmitClick}
            handleSubmitClick={this.handleSubmitClick}
            reviewingEvents={this.state.reviewingEvents}
            submitting={this.state.submitting}
            submitted={this.state.submitted}
          />
        )}
        <GoogleCalendar
          gapiLoaded={this.state.gapiLoaded}
          gapiLoadFailed={this.state.gapiLoadFailed}
          isAuthorized={this.state.isAuthorized}
          handleAuthClick={this.handleAuthClick}
          handleSignoutClick={this.handleSignoutClick}
          handleAddToCalendarClick={this.handleAddToCalendarClick}
        />
        <section className="content">
          <Courses
            onKeyPressInputField={this.onKeyPressInputField}
            key={this.state.year + this.state.semester}
            courseClickHandler={this.courseClickHandler}
            activeCourse={this.state.scheduleCourseCode}
            activeCourseClickHandler={this.clearSchedule}
            yearChangeHandler={this.yearChangeHandler}
            semesterChangeHandler={this.semesterChangeHandler}
            baseYear={this.state.baseYear}
            year={this.state.year}
            semester={this.state.semester}
          />
          {!(this.state.scheduleCourseCode === "") && (
            <Schedule
              testing={this.testTestTestTestTestTest}
              selectAllEvents={this.selectAllEvents}
              selectAllGroupEvents={this.selectAllGroupEvents}
              scheduleSelectAll={this.handleScheduleSelectAll}
              handleBackClick={this.clearSchedule}
              selectedEvents={this.state.selectedEvents}
              eventClickHandler={this.scheduleEventClickHandler}
              key={this.state.scheduleCourseCode}
              courseCode={this.state.scheduleCourseCode}
              year={this.state.year}
              semester={this.state.semester}
            />
          )}
        </section>
        <Footer />
      </section>
    );
  }
}

/* Code which enables usage of selective hover only on devices supporting hover
as media queries for hover do not work in Firefox (for me) */

/* Taken from the following link */
/*https://stackoverflow.com/questions/40532204/media-query-for-devices-supporting-hover*/
const canHover = !matchMedia("(hover: none)").matches;
if (canHover) document.body.classList.add("canHover");

/* Render the application */
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
