import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Authorzited from "../../Authozited";
import { Login, MoviesInsert, MoviesList, MoviesUpdate } from "../../pages";
import ForgotPassword from "../../pages/user/forgot-password";
import Register from "../../pages/user/register";
import HomePage from "../../pages/user/home";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ProductDetail from "../../pages/user/product-id";
import StoreProduct from "../../pages/user/store";
import Payment from "../../pages/user/store/component/payment";
import OrderForm from "../../pages/user/follow-order";
import OrderDetail from "../../pages/user/follow-order/follow-order-detail";
import MessengerCustomerChat from "react-messenger-customer-chat";
import FilterProduct from "../../pages/user/filter-product";
import Profile from "../../pages/user/profile";
const LayoutBlank = () => {
  return (
    <>
      <Router>
        <Header />
        <div style={{ minHeight: "calc(100vh - 400px)" }}>
          {/* <div className="fb-customerchat" id="286695432832368">Chat</div> */}

          <Switch>
            <Authorzited path="/movies/list" component={MoviesList} />
            <Authorzited path="/movies/create" component={MoviesInsert} />

            <Authorzited path="/product/:id" component={ProductDetail} />
            <Authorzited path="/store" component={StoreProduct} />
            <Authorzited path="/payment" component={Payment} />
            <Route path="/product-filter" exact component={FilterProduct} />
            <Authorzited path="/order-form" component={OrderForm} />
            <Authorzited
              path="/follow-order-detail"
              exact
              component={OrderDetail}
            />
            <Route path="/register" exact component={Register} />
            <Authorzited path="/profile" exact component={Profile} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
};
export default LayoutBlank;
