import React from "react";

/**
 * The header of the course section,
 * includes search field and DDL selectors for year and semester
 */
class CourseListHeader extends React.Component {
  state = { years: [] /* Years for which to provide the option to select */ };

  /* Base the possible years on the baseYear provided in props */
  componentDidMount() {
    var years = [];
    for (var i = 0; i < 10; i++) {
      years.push(parseInt(this.props.baseYear, 10) + 1 - i);
    }
    this.setState({ years });
  }

  /* Render the header */
  render() {
    return (
      <section className="CourseListHeader">
        <h3>Courses</h3>
        {/* Year DDL selector */}
        <select
          value={this.props.year}
          onChange={this.props.yearChangeHandler}
          id="yearDDL"
        >
          {this.state.years.map(year => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        {/* Semester DDL selector */}
        <select
          value={this.props.semester}
          onChange={this.props.semesterChangeHandler}
          id="semesterDDL"
        >
          <option value="v">Spring</option>
          <option value="h">Autumn</option>
        </select>
        {/* Search field */}
        <input
          onKeyPress={this.props.onKeyPressInputField}
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
