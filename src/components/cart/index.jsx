import React, { useState, useEffect } from "react";
import Cart from "./items";
import Loading from "../modal/loading";

export default function Index({
  cart,
  fetchCart,
  handleCartUpdate,
  handleClearCart,
  handleRemoveItem,
}) {
  console.log(cart);
  return (
    <div>
      {Object.keys(cart).length === 0 ? (
        <Loading />
      ) : (
        <div>
            <div className="cart__header">
              <h4 className="cart__items">
                {cart.subtotal.formatted_with_symbol} ~ {cart.total_items} items
              </h4>
              {cart.total_items !== 0 && (
                <button className="cart__header-remove" onClick={handleClearCart}>
                  Remove all items
                </button>
              )}
            </div>
          <div className="products">
            {cart.line_items.map((product) => (
              <Cart
                key={product.id}
                product={product}
                fetchCart={fetchCart}
                handleCartUpdate={handleCartUpdate}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
