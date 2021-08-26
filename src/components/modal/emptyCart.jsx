import React, { useState, useEffect, useRef } from "react";
import {useHistory} from "react-router-dom";

import "../../App.css";

import Loading from "./loading";

export default function Index({
  handleClearCart,
  closeModal,
}) {

  const history = useHistory();
  
  const modalRef = useRef();

  const onOutsideClick = (e) => {
    const el = e.target;
    if (modalRef.current && !modalRef.current.contains(el)) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    }
  };

  const handleClear = () => {
    handleClearCart();
    closeModal();
    history.push("/");
  };

  useEffect(() => {
    document.body.addEventListener("click", onOutsideClick);

    return () => {
      document.body.removeEventListener("click", onOutsideClick);
    };
  }, []);
  return (
    <div className="modal__overlay">
      <div ref={modalRef} className="modal__card">
        <h3 className="modal-header">
          Are you sure you want to {" "}
          <span className="delete__item-name">empty</span> your cart?
        </h3>

        <div className="clear__cart-btns">
          <button className="remove__cart" onClick={handleClear}>
            Proceed
          </button>
          <button className="more__cart" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
