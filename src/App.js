import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home.js';
import Error from './pages/Error/Error.js';
import ProductPage from './pages/ProductPage/ProductPage.js';
import AllProducts from './pages/AllProducts/AllProducts.js';
import About from './pages/About/About.js';
import Cart from './pages/Cart/Cart.js';
import Login from './pages/Login/Login.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Main from './components/Main/Main.js';

export default function App() {
  return (
    <Router>

      <Header/>

      <Main>
        <Switch>

          <Route path="/products/:id">
            <ProductPage/>
          </Route>

          <Route path="/products">
            <AllProducts/>
          </Route>

          <Route path="/about">
            <About/>
          </Route>

          <Route path="/cart">
            <Cart/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="*">
            <Error message="404 page not found."/>
          </Route>

        </Switch>
      </Main>

      <Footer/>

    </Router>
  );
}