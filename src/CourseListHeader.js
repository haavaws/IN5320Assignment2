import React from "react";

class CourseListHeader extends React.Component {
  render() {
    return (
      <section className="CourseListHeader">
        <h3>Courses</h3>
        <select onChange={this.props.yearChangeHandler} id="yearDDL">
          <option value={this.props.year}>{this.props.year}</option>
        </select>
        <select
          value={this.props.semester}
          onChange={this.props.semesterChangeHandler}
          id="semesterDDL"
        >
          <option value="v">Spring</option>
          <option value="h">Autumn</option>
        </select>

        <input
          onChange={this.props.inputChangeHandler}
          className="searchField"
          value={this.props.searchValue}
          placeholder="Search..."
        />
      </section>
    );
  }
}

export default CourseListHeader;
