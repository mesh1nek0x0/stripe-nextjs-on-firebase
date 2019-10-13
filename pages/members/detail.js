import React from "react";
import withAuth from "../../components/helpers/withAuth";
import { firestore } from "../../lib/firebase";
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: []
    };
  }
  componentDidMount() {
    firestore
      .collection("stripe_customers")
      .doc(this.props.currentUser.uid)
      .collection("sources")
      .onSnapshot(
        snapshot => {
          let newSources = [];
          snapshot.forEach(doc => {
            const id = doc.id;
            newSources.push({ key: id, value: doc.data() });
          });
          const state = Object.assign(this.state, {
            sources: newSources
          });
          this.setState(state);
        },
        () => {
          const state = Object.assign(this.state, {
            sources: []
          });
          this.setState(state);
        }
      );
  }

  render() {
    return (
      <>
        <h1>pages/members/[account].js</h1>
        <p>YOUR ACCOUNT: {this.props.currentUser.email}</p>
        <p>YOUR NAME: {this.props.currentUser.displayName}</p>
        <h2>YOUR CARD LIST</h2>
        <ul>
          {this.state.sources.map(source => {
            return <li key={source.key}>{source.value.last4}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default withAuth(Account);
