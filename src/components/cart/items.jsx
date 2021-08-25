import React, { useState, useEffect } from "react";
import "../../App.css";

import { commerce } from "../../lib/commerce";

export default function Index({
  product,
  fetchCart,
  handleCartUpdate,
  handleRemoveItem,
}) {
  const [quant, setQuant] = useState(product.quantity);

  const handleQuantity = (e) => {
    setQuant(e.target.value);
  };

  useEffect(() => {
    handleCartUpdate(product.id, quant);
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
        <button
          className="remove__cart"
          onClick={() => {
            handleRemoveItem(product.id);
          }}
        >
          <i className="fas fa-trash icon"></i>
        </button>
        <input
          type="number"
          className="cart__quantity"
          value={quant}
          onChange={handleQuantity}
        />
      </div>
    </div>
  );
}
