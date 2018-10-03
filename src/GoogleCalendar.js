import React from "react";

class GoogleCalendar extends React.Component {
  render() {
    if (this.props.gapiLoadFailed) {
      return (
        <section
          className="GoogleCalendar"
          style={{
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "red",
            color: "white"
          }}
        >
          <h1>Google API failed to load</h1>
          <p>
            This may be caused by not allowing third party storage in your web
            browser, try enabling third party cookies and site data in your
            browser.
          </p>
          <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences">
            Firefox
          </a>
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
        {this.props.isAuthorized && <div className="buttonBorder" />}
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
