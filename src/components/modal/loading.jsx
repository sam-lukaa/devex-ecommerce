import React, { useState, useEffect, useRef } from "react";
import "../../App.css";

export default function Index({ closeModal }) {
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
    <div className="modal__overlay">
      <div ref={modalRef} className="modal__card">
        <div className="loader">Loading...</div>
      </div>
    </div>
  );
}
