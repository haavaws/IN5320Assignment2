import React from "react";
import GapiLoading from "./GapiLoading.js";

class GoogleCalendar extends React.Component {
  render() {
    if (!this.props.gapiLoaded) {
      return (
        <section className="GoogleCalendar">
          <GapiLoading />
        </section>
      );
    }
    if (this.props.gapiLoadFailed) {
      return (
        <section className="GoogleCalendar gapiFailed">
          <h1>Google API failed to load</h1>
          <p>
            This may be caused by not allowing third party storage in your web
            browser, try enabling third party cookies and site data in your
            browser.
          </p>
          <span>
            <p>
              <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences">
                Firefox
              </a>
            </p>
            <p>
              <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en">
                Chrome
              </a>
            </p>
          </span>
        </section>
      );
    }
    return (
      <section className="GoogleCalendar">
        <button
          onClick={
            (this.props.isAuthorized && this.props.handleSignoutClick) ||
            this.props.handleAuthClick
          }
        >
          {(this.props.isAuthorized && "Sign out") || "Sign in"}
        </button>
        {this.props.isAuthorized && (
          <button onClick={this.props.handleAddToCalendarClick}>
            Add to calendar
          </button>
        )}
      </section>
    );
  }
}

export default GoogleCalendar;
