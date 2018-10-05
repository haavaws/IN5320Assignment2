import React from "react";

/**
 * This section is the footer of the web app.
 * It contains links to websites where the images used in this web app
 * were downloaded from, some of which required by their respective
 * licenses.
 */
class Footer extends React.Component {
  render() {
    return (
      <section className="Footer">
        <p>Icons powered by: </p>
        <span>
          <a href="https://loading.io/">loading.io</a>
          <a href="https://icons8.com">Icons8</a>
          <a href="https://www.iconfinder.com">ICONFINDER</a>
          <a href="https://www.iconsdb.com/">ICONSDB</a>
        </span>
      </section>
    );
  }
}

export default Footer;
