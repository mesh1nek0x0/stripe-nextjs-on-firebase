import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import withAuth from "../components/helpers/withAuth";
import { firestore } from "../lib/firebase";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: []
    };
    this.submit = this.submit.bind(this);
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

  async submit(ev) {
    const { token, error } = await this.props.stripe.createToken();
    firestore
      .collection("stripe_customers")
      .doc(this.props.currentUser.uid)
      .collection("tokens")
      .add({ token: token.id })
      .then(() => {
        this._element.clear();
      });
  }

  render() {
    return (
      <>
        <p>YOUR ACCOUNT: {this.props.currentUser.email}</p>
        <p>YOUR NAME: {this.props.currentUser.displayName}</p>
        <div className="checkout">
          <p>Would you like to add a new card?</p>
          <CardElement onReady={c => (this._element = c)} />
          <button onClick={this.submit}>ADD</button>
        </div>
        <div>
          <ul>
            {this.state.sources.map(source => {
              return <li key={source.key}>{source.value.last4}</li>;
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default withAuth(injectStripe(CheckoutForm));
