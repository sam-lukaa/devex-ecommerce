import React, { useState, useEffect } from "react";
import {useHistory, Link} from "react-router-dom";

import Cart from "./items";
import Loading from "../modal/loading";
import RemoveItem from "../modal/deleteItem";
import ClearCart from "../modal/emptyCart";

export default function Index({
  cart,
  fetchCart,
  handleCartUpdate,
  handleClearCart,
  handleRemoveItem,
}) {

  const history = useHistory();
  
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [image, setImg] = useState();
  const [showModal, setModal] = useState(false);
  const [showAllModal, setAllModal] = useState(false);

  const handleModal = () => {
    setModal(!showModal);
  };

  const handleAllModal = () => {
    setAllModal(!showAllModal);
  };

  const closeModal = () => {
    setModal(false);
  };

  const closeAllModal = () => {
    setAllModal(false);
  };

  const handleShowModal = (itemId, itemName, itemImg) => {
    setId(itemId);
    setName(itemName);
    setImg(itemImg);
    handleModal();
  };

  const handleShowAllModal = (itemId, itemName, itemImg) => {
    handleAllModal();
  };

  return (
    <div>
      {Object.keys(cart).length === 0 ? (
        <Loading />
      ) : (
        <div>
          {showModal && (
            <RemoveItem
              id={id}
              name={name}
              image={image}
              fetchCart={fetchCart}
              closeModal={closeModal}
              removeItem={handleRemoveItem}
            />
          )}

          {showAllModal && (
            <ClearCart
              handleClearCart={handleClearCart}
              closeModal={closeAllModal}
            />
          )}

          <div className="cart__header">
            <h4 className="cart__items">
              {cart.subtotal.formatted_with_symbol} ~~ {cart.total_items} items
            </h4>
            {cart.total_items !== 0 && (
              <button className="cart__header-remove" onClick={handleAllModal}>
                {/* Remove all items */}
                <i className="fas fa-shopping-cart"></i>
              </button>
            )}
          </div>
          <div>
            {cart.line_items.length > 0 ? (
              <div className="products">
                {cart.line_items.map((product) => (
                  <Cart
                    key={product.id}
                    product={product}
                    fetchCart={fetchCart}
                    handleCartUpdate={handleCartUpdate}
                    setId={setId}
                    setName={setName}
                    handleModal={handleModal}
                    handleShowModal={handleShowModal}
                  />
                ))}
              </div>
            ) : (
              <div className="empty__cart">
                <h2>You have no item.</h2>{" "}
                <Link to="/" className="empty__cart-link">
                  Start shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
