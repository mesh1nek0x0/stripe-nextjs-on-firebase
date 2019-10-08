import React from "react";
import router from "next/router";
import { auth } from "../../lib/firebase";
const withAuth = Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: "LOADING",
        user: {}
      };
    }
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          const state = Object.assign(this.state, {
            status: "SIGNED_IN",
            user: authUser
          });
          this.setState(state);
        } else {
          router.push("/");
        }
      });
    }
    renderContent() {
      const { status, user } = this.state;
      if (status == "LOADING") {
        return <h1>Loading ......</h1>;
      } else if (status == "SIGNED_IN") {
        return <Component {...this.props} currentUser={user} />;
      }
    }
    render() {
      return <>{this.renderContent()}</>;
    }
  };
};
export default withAuth;
