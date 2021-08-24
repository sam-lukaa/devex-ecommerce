import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import "./App.css";

import ProductsList from "./components/ProductsList";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
    // console.log(cart);
  };

  const handleCart = async (id, quantity) => {
    const item = await commerce.cart.add(id, quantity);
    setCart(item.cart);
    setCartSuccess(item.success);
    {
      cartSuccess === true
        ? setCartMessage("Item added to cart!")
        : setCartMessage("An error occured please try again");
    }
    console.log(item);
  };

  const handleDismissCartMessage = () => {
    setCartMessage();
    setCartSuccess(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <i className="fas fa-shopping-cart"></i> <span>{cart.total_items}</span>
      <ProductsList
        products={products}
        handleCart={handleCart}
        cart={cart}
        cartSuccess={cartSuccess}
        cartMessage={cartMessage}
        setCartMessage={setCartMessage}
        handleDismissCartMessage={handleDismissCartMessage}
      />
      {cartMessage ? (
        <div>
          <p>{cartMessage}</p>
          <button onClick={handleDismissCartMessage}>X</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
