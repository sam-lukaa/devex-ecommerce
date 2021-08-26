import React, { useState, useEffect } from "react";
import "../../App.css";

import RemoveItem from "../modal/deleteItem";

export default function Index({ product, fetchCart, handleCartUpdate, handleShowModal }) {
  const [quant, setQuant] = useState(product.quantity);

  const handleQuantity = (e) => {
    setQuant(e.target.value);
  };

  useEffect(() => {
    handleCartUpdate(product.id, quant);
    fetchCart();
  }, [quant]);

  return (
    <div className="product__card">
      <h4 className="product__name">
        {product.name}({product.price.formatted_with_symbol})
      </h4>
      <img
        className="product__img"
        src={product.media.source}
        alt={product.name}
      />
      <div className="product__btn">
        {/* handleRemoveItem(product.id); */}
        <button
          className="remove__cart"
          onClick={() =>
            handleShowModal(product.id, product.name, product.media.source)
          }
        >
          <i className="fas fa-trash icon"></i>
        </button>
        <input
          type="number"
          className="cart__quantity"
          min="1"
          value={quant}
          onChange={handleQuantity}
        />
      </div>
    </div>
  );
}
