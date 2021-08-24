import React, { useState } from "react";

import ProductItem from "./ProductItem";
import ProductDetails from "./modal/product";
import Loading from "./modal/loading";

export default function ProductsList({
  products,
  handleCart,
  cart,
  cartSuccess,
  cartMessage,
  handleDismissCartMessage,
}) {
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div>
      {modal && (
        <ProductDetails
          product={details}
          closeModal={closeModal}
          addToCart={handleCart}
          loading={loading}
        />
      )}
      {products.length > 0 ? (
        products.map((product) => (
          <div className="products">
            <ProductItem
              key={product.id}
              product={product}
              addToCart={handleCart}
              cart={cart}
              setDetails={setDetails}
              handleModal={handleModal}
              setLoading={setLoading}
            />
          </div>
        ))
      ) : (
        <Loading closeModal={closeModal} />
      )}
    </div>
  );
}
