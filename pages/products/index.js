import React from "react";
import Link from "next/link";
import { firestore } from "../../lib/firebase";

function Products(props) {
  return (
    <>
      <h1>pages/products</h1>
      <Link href="/">
        <a>Go back to TOP</a>
      </Link>
      <ul>
        {props.products.map(product => {
          return (
            <li key={product.id}>
              <Link href="/products/[product]" as={`/products/${product.id}`}>
                <a>{product.pageName}</a>
              </Link>
              <ul>
                <li>{product.artistName}</li>
                <li>{product.monthlyFee}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}

Products.getInitialProps = async () => {
  const result = await firestore
    .collection("fanPages")
    .get()
    .then(snapshot => {
      let data = [];
      snapshot.forEach(doc => {
        data.push(
          Object.assign(
            {
              id: doc.id
            },
            doc.data()
          )
        );
      });

      return data;
    });
  return { products: result };
};

export default Products;
