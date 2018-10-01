import React from "react";
import ReactDOM from "react-dom";
import Courses from "./Courses";
import Schedule from "./Schedule";
import GoogleCalendar from "./GoogleCalendar";
import gapi from "./GoogleApi.js";

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
    isAuthorized: false,
    currentApiRequest: {},
    GoogleAuth: {}
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

  courseClickHandler = async event => {
    const courseCode = event.currentTarget.childNodes[0].innerHTML;
    this.setState({
      scheduleCourseCode: courseCode
    });
  };

  /* Code interacting with google services based on:
  https://developers.google.com/calendar/quickstart/js#step_2_set_up_the_sample */

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient = () => {
    console.log("hei");
    gapi.client
      .init({
        apiKey: this.state.apiKey,
        clientId: this.state.clientId,
        discoveryDocs: this.state.discoveryDocs,
        scope: this.state.scope
      })
      .then(() => {
        console.log("ho");
        // Listen for sign-in state changes.
        var GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.isSignedIn.listen(this.updateSigninStatus);

        this.updateSigninStatus(GoogleAuth.isSignedIn.get());

        this.setState({ GoogleAuth: GoogleAuth });
      });
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

  sendAuthorizedApiRequest = requestDetails => {
    if (this.state.isAuthorized) {
      // Make API request
      gapi.client.request(requestDetails);

      // Reset currentApiRequest variable.
      this.setState({ currentApiRequest: {} });
    } else {
      this.setState({ currentApiRequest: requestDetails });
      this.state.GoogleAuth.signIn();
    }
  };

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick = event => {
    this.state.GoogleAuth.signIn();
  };

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick = event => {
    this.state.GoogleAuth.signOut();
    this.state.GoogleAuth.disconnect();
  };

  componentDidMount() {
    console.log(window.location.hostname);

    var date = new Date(Date.now());
    var year = date.getFullYear();
    var semester = date.getMonth();
    if (semester > 6) {
      semester = "h";
    } else semester = "v";
    this.setState({ year, semester });
    gapi.load("client:auth2", this.initClient);
  }

  render() {
    return (
      <section className="App">
        <GoogleCalendar
          isAuthorized={this.state.isAuthorized}
          handleAuthClick={this.handleAuthClick}
          handleSignoutClick={this.handleSignoutClick}
        />
        <section className="content">
          <Courses
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
