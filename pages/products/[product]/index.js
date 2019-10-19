import React from "react";
import Payable from "../../../components/Payable";
import { auth, firestore } from "../../../lib/firebase";
import Link from "next/link";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: {}
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        const state = Object.assign(this.state, {
          isLogin: true,
          user: authUser
        });
        this.setState(state);
      } else {
        this.setState({
          isLogin: false,
          user: {}
        });
      }
    });
  }

  render() {
    return (
      <>
        <h1>pages/products/[product]</h1>
        <Link href="/products">
          <a>Go Back to Products List</a>
        </Link>
        <h2>PRODUCT DETAIL</h2>
        <ul>
          <li>PRODUCT NAME: {this.props.product.pageName}</li>
          <li>MONTHLY FEE: {this.props.product.monthlyFee}</li>
        </ul>
        {this.state.isLogin ? (
          <Payable
            amount={this.props.product.monthlyFee}
            currentUid={this.state.user.uid}
          />
        ) : (
          "PLEASE LOGIN"
        )}
      </>
    );
  }

  static async getInitialProps({ query }) {
    const result = await firestore
      .collection("fanPages")
      .doc(query.product)
      .get()
      .then(snapshot => {
        return snapshot.data();
      });
    return { product: result };
  }
}

export default Product;
