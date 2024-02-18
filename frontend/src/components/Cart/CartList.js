import React from "react";
import axios from "axios";
import CartItem from "./CartItem";
import { addToCartAction } from "../../redux/actions/CartAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CartList extends React.PureComponent {
  constructor(props) {
    super(props);

    var localCart = localStorage.getItem("localCart");
    var prevCart = [];
    if (localCart) prevCart = JSON.parse(localCart);

    var prevCartTotalAmount = 0;
    var prevCartTotalQuantity = 0;

    for (let i = 0; i < prevCart.length; i++) {
      prevCartTotalAmount += prevCart[i].price * prevCart[i].units;
      prevCartTotalQuantity += prevCart[i].units;
    }

    this.state = {
      cart: prevCart,
      cartTotalAmount: prevCartTotalAmount,
      cartTotalQuantity: prevCartTotalQuantity,
      orderPlaced: false,
    };
  }

  handleAddProduct = (product) => {
    // console.log("clicked",product);
    this.props.addToCartAction(product);
    this.setState({orderPlaced:false});
  };

  updateStates = (cart) => {
    // console.log("updating state", cart);
    let cartTotalAmount = 0;
    let cartTotalQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
      cartTotalAmount += cart[i].price * cart[i].units;
      cartTotalQuantity += cart[i].units;
    }
    this.setState({
      cart: cart,
      cartTotalAmount: cartTotalAmount,
      cartTotalQuantity: cartTotalQuantity,
    });
  };

  CreateOrder = (e) => {
    e.preventDefault();

    var userAuth = JSON.parse(localStorage.getItem("userAuthDetails"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAuth.user.token,
      },
    };

    const order = this.state.cart;
    const user = userAuth.user.user;
    const orderTotalQuantity = this.state.cartTotalQuantity;
    const orderTotalAmount = this.state.cartTotalAmount;

    //Request body
    const body = {
      order,
      user,
      orderTotalQuantity,
      orderTotalAmount,
    };

    axios.post("/api/orders/", body, config).then(
      (res) => {
        console.log(res.data, res.status);
        this.setState({orderPlaced:true});
        localStorage.removeItem("localCart");
        this.updateStates([]);
        window.location.reload(true);
      },
      (err) => console.log(err)
    );
  };

  componentDidUpdate() {
    if (!this.state.orderPlaced) {
      const { cart } = this.props;
      this.updateStates(cart);
      localStorage.setItem("localCart", JSON.stringify(cart));
    }
  }

  render() {
    return (
      <div className="dropdown">
        <button type="button" className="btn btn-info" data-toggle="dropdown">
          <i className="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
          Shopping Cart{" "}
          <span className="badge badge-pill badge-danger">
            {this.state.cartTotalQuantity}
          </span>
        </button>
        <form className="dropdown-menu">
          <div className="row total-header-section">
            <div className="col-lg-6 col-sm-6 col-6">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
              <span className="badge badge-pill badge-danger">
                {this.state.cartTotalQuantity}
              </span>
            </div>
            <div className="col-lg-6 col-sm-6 col-6 total-section text-right">
              <p>
                Total Amount:{" "}
                <span className="text-info">${this.state.cartTotalAmount}</span>
              </p>
            </div>
          </div>
          {this.state.cart.map((item) => (
            <CartItem {...item} key={item.id} addProd={this.handleAddProduct} />
          ))}

          <div className="row">
            <div className="col-lg-12 col-sm-12 col-12 text-center checkout">
              <button
                className="btn btn-primary btn-block"
                onClick={this.CreateOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cart: cart,
  };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToCartAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionsToProps)(CartList);
