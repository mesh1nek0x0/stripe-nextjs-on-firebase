import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import withAuth from "../components/helpers/withAuth";
import { firestore } from "../lib/firebase";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
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
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement onReady={c => (this._element = c)} />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default withAuth(injectStripe(CheckoutForm));
