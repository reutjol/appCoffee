import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

import Shop from "./components/Shop/Shop";
import AddProduct from "./components/Products/AddProduct/AddProduct";
import UpdateProduct from "./components/Products/UpdateProduct/UpdateProduct";
import ShowOrders from "./components/Shop/Orders/ShowOrders";

export default class Routes extends Component {
  render() {
    // console.log("routes",this.props.isAuthUser);
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/Shop"
            render={(props) => (
              <Shop {...props} isAuthUser={this.props.isAuthUser} />
            )}
          />
          <Route path="/AddProduct" component={AddProduct} />
          <Route
            path="/UpdateProduct"
            render={(props) => <UpdateProduct {...props} />}
          />
          <Route path="/ShowOrders" component={ShowOrders} />
        </Switch>
      </Router>
    );
  }
}
