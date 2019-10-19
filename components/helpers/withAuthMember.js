import React from "react";
import router from "next/router";
import { auth, firestore } from "../../lib/firebase";
const withAuthMember = Component => {
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
          console.log(router.query);
          firestore
            .collection("fanPages")
            .doc(router.query.product)
            .collection("members")
            .doc(authUser.uid)
            .get()
            .then(snapshot => {
              if (snapshot.exists) {
                this.setState({
                  status: "SIGNED_IN",
                  user: authUser
                });
              } else {
                router.push(
                  "/products/[product]",
                  `/products/${router.query.product}`,
                  { shallow: true }
                );
              }
            });
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
export default withAuthMember;
