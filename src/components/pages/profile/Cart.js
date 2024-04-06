import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../../store/cartSlice";
import axios from 'axios';

const Cart = () => {

    const { cart } = useSelector(state => ({ ...state }));
    
    const { user } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();

    const handleCheckout = async (data) => {
        try {
          // console.log(data);
            const response = await axios.post(process.env.REACT_APP_API + '/checkout', data, {
                headers: {
                  authtoken: user.user.token
                }
            }).then((response) => {
                window.open(response.data.data.webPaymentUrl, "_blank");
                // console.log(response.data.data);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        dispatch(removeItem(item));
                      }}
                    >
                      X
                    </button>
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={"http://localhost:5000/uploads/" + item.image}
                      alt={item.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        dispatch(decrementQuantity(item._id));
                      }}
                    >
                      -
                    </button>
                    <button className="btn btn-light">{item.quantity}</button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        dispatch(incrementQuantity(item._id));
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="5">Total</td>
                <td>
                  {cart.cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="4"></td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                        dispatch(clearCart());
                        }}>
                        Clear Cart
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            let data = {
                                user : user.user.id,
                                products : cart.cart,
                                total : cart.cart.reduce(
                                    (acc, item) => acc + item.price * item.quantity,
                                    0
                                )
                            };
                            handleCheckout(data);
                        }}
                    >
                        Checkout
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cart