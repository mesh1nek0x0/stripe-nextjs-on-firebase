import React from "react";
import Nav from "../components/nav";
import withAuth from "../components/helpers/withAuth";
class Dashboard extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Nav />
        <h1>Dashboard Page</h1>
        <p>You can't go into this page if you are not authenticated.</p>
      </div>
    );
  }
}
export default withAuth(Dashboard);
