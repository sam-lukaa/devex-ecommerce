import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import { commerce } from "./lib/commerce";
import "./App.css";

import ProductsList from "./components/ProductsList";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryItem, setCategory] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    setCategories(data);
  };

  const fetchCategory = async (slug) => {
    const { data } = await commerce.products.list({ category_slug: slug });
    setCategory(data);
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
  };

  const handleDismissCartMessage = () => {
    setCartMessage();
    setCartSuccess(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
  }, []);

  return (
    <Router>
      {/* Navbar */}
      <header>
        <h3 className="home__title">DevEx</h3>
        <div className="home__links">
          <Link to="/" className="home__link">Home</Link >
          <Link to="/cart" className="home__cart">
            <span>{cart.total_items}</span>{" "}
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </header>

      <div className="body">
        <div className="categories">
          {categories.map((category) => {
            return (
              <div className="category" key={category.slug}>
                {category.assets.map((asset) => (
                  <img
                  className="category__img"
                  src={asset.url}
                  key={asset.url}
                  />
                ))}

                <button
                  onClick={() => fetchCategory(category.slug)}
                  className="category__btn"
                  >
                  {category.name}({category.products}) ~ View Products
                </button>
              </div>
            );
          })}
        </div>
        <Switch>
          <Route exact path="/"> 
            <ProductsList
              products={products}
              handleCart={handleCart}
              cart={cart}
              cartSuccess={cartSuccess}
              cartMessage={cartMessage}
              setCartMessage={setCartMessage}
              handleDismissCartMessage={handleDismissCartMessage}
            />
        </Route>
        <Route exact path="/category"> </Route>
        <Route exact path="/cart"> </Route>
            </Switch>
        {cartMessage ? (
          <div>
            <p>{cartMessage}</p>
            <button onClick={handleDismissCartMessage}>X</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </Router>
  );
}
