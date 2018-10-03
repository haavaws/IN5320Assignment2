import React from "react";
import ReactDOM from "react-dom";
import GapiLoadingOverlay from "./GapiLoadingOverlay.js";
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
    year: 18,
    semester: "h",
    scheduleCourseCode: "",
    selectedEvents: [],
    isAuthorized: false,
    currentApiRequest: {},
    GoogleAuth: {},
    submitting: false,
    gapiLoaded: false,
    gapiLoadFailed: false
  };

  handleSubmitClick = () => {
    console.log("submitting");
    var i, j;
    const selectedEvents = this.state.selectedEvents;
    for (i = 0; i < selectedEvents.length; i++) {
      const eventGroup = selectedEvents[i];
      for (j = 0; j < eventGroup.events.length; j++) {
        const selectedEvent = eventGroup.events[j];
        const event = {
          summary: eventGroup.groupTitle + ": " + selectedEvent.eventTitle,
          location: selectedEvent.buildingName + " " + selectedEvent.roomName,
          start: {
            dateTime: selectedEvent.dtStart
          },
          end: {
            dateTime: selectedEvent.dtEnd
          }
        };
        var request = window.gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event
        });
        console.log("submitting next");

        request.execute((jsonResp, rawResp) => {
          console.log(jsonResp + rawResp);
        });
        console.log("submitted");
      }
    }
  };

  yearChangeHandler = event => {
    this.setState({ year: event.target.value });
  };

  semesterChangeHandler = event => {
    this.setState({ semester: event.target.value });
  };

  clearSchedule = () => {
    this.setState({
      scheduleCourseCode: ""
    });
  };

  handleAddToCalendarClick = () => {
    console.log("hei");
    this.setState({ submitting: true });
  };

  handleCancelSubmitClick = () => {
    this.setState({ submitting: false });
  };

  courseClickHandler = async event => {
    const courseCode = event.currentTarget.childNodes[0].innerHTML;
    this.setState({
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
        () => {
          this.setState({ gapiLoaded: true });
          this.setState({ gapiLoadFailed: true });
          console.log("hei");
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
      /*
      if (this.state.currentApiRequest) {
        this.sendAuthorizedApiRequest(this.state.currentApiRequest);
      }
      */
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

    this.setState({ year, semester });

    window.gapi.load("client:auth2", this.initClient);
    console.log("gapi loaded");
  }

  render() {
    if (!this.state.gapiLoaded) {
      return (
        <section className="App">
          <GapiLoadingOverlay />
        </section>
      );
    }
    return (
      <section className="App">
        {this.state.submitting && (
          <SubmitOverlay
            courseCode={this.state.scheduleCourseCode}
            calendarEvents={this.state.selectedEvents}
            handleCancelSubmitClick={this.handleCancelSubmitClick}
            handleSubmitClick={this.handleSubmitClick}
          />
        )}
        <GoogleCalendar
          gapiLoadFailed={this.state.gapiLoadFailed}
          isAuthorized={this.state.isAuthorized}
          handleAuthClick={this.handleAuthClick}
          handleSignoutClick={this.handleSignoutClick}
          handleAddToCalendarClick={this.handleAddToCalendarClick}
        />
        <section className="content">
          <Courses
            onKeyPressInputField={this.onKeyPressInputField}
            keyTest={this.state.year + this.state.semester}
            key={this.state.year + this.state.semester}
            courseClickHandler={this.courseClickHandler}
            activeCourse={this.state.scheduleCourseCode}
            activeCourseClickHandler={this.clearSchedule}
            yearChangeHandler={this.yearChangeHandler}
            semesterChangeHandler={this.semesterChangeHandler}
            year={this.state.year}
            semester={this.state.semester}
          />
          {!(this.state.scheduleCourseCode === "") && (
            <Schedule
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
