import React, { useState, useEffect, useRef } from "react";
import "../../App.css";

import Loading from "./loading";

export default function Index({ id, name, image, closeModal, removeItem, fetchCart }) {
  const modalRef = useRef();

  const onOutsideClick = (e) => {
    const el = e.target;
    if (modalRef.current && !modalRef.current.contains(el)) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    }
  };

  const handleRemoveItem = () => {
    removeItem(id);
    fetchCart();
    closeModal();
    console.log(name);
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
          Are you sure you want to remove{" "}
          <span className="delete__item-name">{name}</span> from cart?
        </h3>
        <img className="delete__item-img" src={image} alt={name} />

        <div className="remove__item-btns">
          <button className="remove__cart" onClick={handleRemoveItem}>
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
