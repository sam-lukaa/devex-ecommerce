import React, { useState, useEffect, useRef } from "react";
import "../../App.css";

import Loading from "./loading";

export default function Index({ product, closeModal, addToCart, loading }) {
  const modalRef = useRef();

  const onOutsideClick = (e) => {
    const el = e.target;
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
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="modal__description"
              ></div>
              <img
                src={product.media.source}
                alt={product.name}
                className="modal__main-img"
              />
              <button
                className="add__cart"
                onClick={() => {
                  addToCart(product.id, 1);
                }}
              >
                <i className="fas fa-cart-plus icon">
                  <small className="modal__price">
                    {product.price.formatted_with_symbol}
                  </small>
                </i>
              </button>
            </div>

            <h3 className="modal__text">Related products</h3>
            {product.related_products.slice(0, 1).map((related) => (
              <div>
                <div className="related__products">
                  <img className="modal__rel-img" src={related.media.source} />
                  <p className="modal__text">
                    {related.name}({related.price.formatted_with_symbol})
                  </p>
                </div>
                {product.related_products.length > 1 && (
                  <button className="modal__rel-btn">View more</button>
                )}
              </div>
            ))}

            {/* <div>
              {product.related_products.length > 0 && 
                {product.related_products.map((related) => (
                  <div>

                    <h1 className="modal__description">{related.id}</h1>
                    </div>
                  ))}
              }
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
