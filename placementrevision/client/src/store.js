import {createStore,combineReducers,applyMiddleware} from"redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productdetails, productreducer } from "./reducer/productreducer";
import {userreducer,profilereducer} from "./reducer/userreducer";
import { cartreducer } from "./reducer/cartreducer";
import { orderreducer } from "./reducer/orderreducer";

const reducer=combineReducers({
    products:productreducer,
    productdetails:productdetails,
    user:userreducer,
    profile:profilereducer,
    cart:cartreducer,
    order:orderreducer
});

let initialstate={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },
};

const middleware = [thunk];

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)));

export default store;