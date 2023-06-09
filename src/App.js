import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Main from './components/Main/Main.js';
import Messenger from './components/Messenger/Messenger.js';
import Loading from './components/Loading/Loading.js';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.js';

const Home = lazy(() => import('./pages/Home/Home.js'));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage.js'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage.js'));
const AllProducts = lazy(() => import('./pages/AllProducts/AllProducts.js'));
const About = lazy(() => import('./pages/About/About.js'));
const Cart = lazy(() => import('./pages/Cart/Cart.js'));
const Login = lazy(() => import('./pages/Login/Login.js'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout.js'));
const CartChangelog = lazy(() => import('./pages/CartChangelog/CartChangelog.js'));

export default function App() {
  return (
    <Router>

      <Messenger/>

      <Header/>

      <Main>
        <ErrorBoundary>
          <Suspense fallback={<Loading/>}>
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

                <Route path="/cart-changelog">
                  <CartChangelog/>
                </Route>

                <Route path="/cart">
                  <Cart/>
                </Route>

                <Route path="/login">
                  <Login/>
                </Route>

                <Route path="/checkout">
                  <Checkout/>
                </Route>

                <Route exact path="/">
                  <Home/>
                </Route>

                <Route path="*">
                  <ErrorPage message="404 page not found."/>
                </Route>
                
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Main>

      <Footer/>

    </Router>
  );
}