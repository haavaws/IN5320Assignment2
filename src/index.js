import React from "react";
import ReactDOM from "react-dom";
import SubmitOverlay from "./SubmitOverlay";
import GoogleCalendar from "./GoogleCalendar";
import Courses from "./Courses";
import Schedule from "./Schedule";

import "./styles.css";

class App extends React.Component {
  state = {
    clientId:
      "854387955330-cga2qvmfslpaj8upun2mmj7f0uk7v09q.apps.googleusercontent.com",
    apiKey: "AIzaSyB9yeq-Uw_1rfjWa698mvW8rQCcVBCDMPs",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ],
    scope: "https://www.googleapis.com/auth/calendar",

    baseYear: 0,
    year: "0",
    semester: "",
    scheduleCourseCode: "",
    selectedEvents: [],
    calendarId: "primary",
    reviewingEvents: false,
    submitting: false,
    submitted: false,

    isAuthorized: false,
    GoogleAuth: {},
    gapiLoaded: false,
    gapiLoadFailed: false
  };
  handleSubmitClick = async () => {
    await this.setState({ reviewingEvents: false, submitting: true });

    console.log("submitting");

    var i, j;
    const selectedEvents = this.state.selectedEvents;
    var addEventPromises = [];
    for (i = 0; i < selectedEvents.length; i++) {
      const eventGroup = selectedEvents[i];
      for (j = 0; j < eventGroup.events.length; j++) {
        const selectedEvent = eventGroup.events[j];
        const event = {
          summary: eventGroup.activityTitle + ": " + selectedEvent.eventTitle,
          location: selectedEvent.buildingName + " " + selectedEvent.roomName,
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

    await Promise.all(addEventPromises).then(responses => {
      console.log("Amount of events added: " + responses.length);
      console.log(responses);
    });

    await this.setState({ submitting: false, submitted: true });
    setTimeout(() => {
      this.setState({
        submitted: false,
        selectedEvents: [],
        calendarId: "primary"
      });
    }, 2000);
  };

  calendarChangeHandler = event => {
    this.setState({ calendarId: event.target.value });
  };

  yearChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ year: event.target.value });
  };

  semesterChangeHandler = event => {
    this.setState({ semester: event.target.value });
  };

  clearSchedule = () => {
    this.setState({
      selectedEvents: [],
      scheduleCourseCode: ""
    });
  };

  handleAddToCalendarClick = () => {
    console.log("hei");
    this.setState({ reviewingEvents: true });
  };

  handleCancelSubmitClick = () => {
    this.setState({ reviewingEvents: false, submitted: false });
  };

  courseClickHandler = async event => {
    const courseCode = event.currentTarget.childNodes[0].innerHTML;
    this.setState({
      selectedEvents: [],
      scheduleCourseCode: courseCode
    });
  };

  onKeyPressInputField = event => {
    if (event.key === "Enter") {
      const courseCode = event.target.value;
      this.setState({ scheduleCourseCode: courseCode });
    }
  };

  scheduleEventClickHandler = event => {
    event.stopPropagation();

    var scheduleEvent = JSON.parse(event.currentTarget.childNodes[0].innerHTML);

    var i;
    var j;

    var newSelectedGroupEvents;
    var newSelectedEvents = Array.from(this.state.selectedEvents);

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
              this.setState({ selectedEvents: newSelectedEvents });
            }
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
    this.setState({ selectedEvents: newSelectedEvents });
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

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient = () => {
    console.log("initClient");
    window.gapi.client
      .init({
        apiKey: this.state.apiKey,
        clientId: this.state.clientId,
        discoveryDocs: this.state.discoveryDocs,
        scope: this.state.scope
      })
      .then(
        () => {
          console.log("init success");
          // Listen for sign-in state changes.
          var GoogleAuth = window.gapi.auth2.getAuthInstance();
          GoogleAuth.isSignedIn.listen(this.updateSigninStatus);

          this.updateSigninStatus(GoogleAuth.isSignedIn.get());

          this.setState({ GoogleAuth: GoogleAuth, gapiLoaded: true });
        },
        e => {
          this.setState({ gapiLoaded: true });
          this.setState({ gapiLoadFailed: true });
          console.log(e);
        }
      );
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus = isSignedIn => {
    if (isSignedIn) {
      this.setState({ isAuthorized: true });
    } else {
      this.setState({ isAuthorized: false });
    }
  };

  /**
   *  Sign the user in upon button click.
   */
  handleAuthClick = async event => {
    try {
      await this.state.GoogleAuth.signIn();
    } catch (e) {
      console.log(e);
      /* Sign-in cancelled */
    }
  };

  /**
   *  Sign the out user upon button click.
   */
  handleSignoutClick = event => {
    this.state.GoogleAuth.signOut();
    this.state.GoogleAuth.disconnect();
  };

  /**
   * When the app load,s set the default semester to load courses for,
   * and load the google api
   */
  componentDidMount() {
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var semester = date.getMonth();

    if (semester > 6) {
      semester = "h";
    } else semester = "v";

    this.setState({ baseYear: year, year: year.toString(), semester });
    setTimeout(() => {}, 1000);
    window.gapi.load("client:auth2", this.initClient);
    console.log("gapi loaded");
  }

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
      </section>
    );
  }
}

/*https://stackoverflow.com/questions/40532204/media-query-for-devices-supporting-hover*/
const canHover = !matchMedia("(hover: none)").matches;
if (canHover) document.body.classList.add("canHover");
console.log(document.body.classList);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
