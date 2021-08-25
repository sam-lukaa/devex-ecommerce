import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
// import stripHtml from "string-strip-html";

export default function ProductItem({
  product,
  addToCart,
  cart,
  setDetails,
  handleModal,
  setLoading,
}) {
  // const { result } = stripHtml(product.description);

  const handleProduct = async () => {
    setLoading(true);
    try {
      setDetails(await commerce.products.retrieve(product.id));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleProductDetails = () => {
    handleModal();
    handleProduct();
  };

  useEffect(() => {
    handleProduct();
  }, []);

  const description = product.description;

  return (
    <div className="product__card">
      <h4 className="product__name">{product.name}</h4>
      <img
        className="product__img"
        src={product.media.source}
        alt={product.name}
      />
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="product__description"
      ></div>
      <small className="product__price">
        {product.price.formatted_with_symbol}
      </small>
      <div className="product__btn">
        <button className="add__cart " onClick={() => addToCart(product.id, 1)}>
          <i className="fas fa-cart-plus icon"></i>
        </button>
        <button className="more__cart" onClick={handleProductDetails}>
          <i className="fas fa-info-circle icon"></i>
        </button>
      </div>
    </div>
  );
}
