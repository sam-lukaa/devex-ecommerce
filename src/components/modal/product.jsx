import React, { useState, useEffect, useRef } from "react";
import "../../App.css";

import Loading from "./loading";

export default function Index({
  product,
  closeModal,
  addToCart,
  loading,
}) {
  const modalRef = useRef();

  const onOutsideClick = (e) => {
    const el = e.traget;
    if (modalRef.current && !modalRef.current.contains(el)) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", onOutsideClick);

    return () => {
      document.body.removeEventListener("click", onOutsideClick);
    };
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="modal__overlay">
          <div ref={modalRef} className="modal__card">
            <div>
              <h3 className="modal-header">{product.name}</h3>
              <img src={product.media.source} alt={product.name} />
              <button
                className="add__cart"
                onClick={() => {
                  addToCart(product.id, 1);
                }}
              >
                <i className="fas fa-cart-plus icon"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
