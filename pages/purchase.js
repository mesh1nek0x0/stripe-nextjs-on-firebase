import React, { Component } from "react";
import Head from "next/head";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";

export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = { stripe: null };
  }
  componentDidMount() {
    // Create Stripe instance in componentDidMount
    // (componentDidMount only fires in browser/DOM environment)
    this.setState({
      stripe: window.Stripe(process.env.stripeKey)
    });
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <div className="example">
          <Head>
            <script src="https://js.stripe.com/v3/" />
          </Head>
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}
