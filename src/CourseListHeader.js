import React from "react";

class CourseListHeader extends React.Component {
  state = { years: [] };
  componentDidMount() {
    var years = [];
    for (var i = 0; i < 10; i++) {
      years.push(parseInt(this.props.baseYear, 10) + 1 - i);
    }
    this.setState({ years });
  }
  render() {
    return (
      <section className="CourseListHeader">
        <h3>Courses</h3>
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
        <select
          value={this.props.semester}
          onChange={this.props.semesterChangeHandler}
          id="semesterDDL"
        >
          <option value="v">Spring</option>
          <option value="h">Autumn</option>
        </select>

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
