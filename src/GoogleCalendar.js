import React from "react";

class GoogleCalendar extends React.Component {
  render() {
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
        {this.props.isAuthorized && <button>Add to calendar</button>}
      </section>
    );
  }
}

export default GoogleCalendar;
