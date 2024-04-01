import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../../../store/cartSlice'

const Cart = () => {

    const { cart } = useSelector(state => ({ ...state }));

    const dispatch = useDispatch();

    

  return (
    <div className='container'>
        <div className='row'>
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
                            dispatch(removeFromCart(item));
                            }}
                        >
                            X
                        </button>
                        </td>
                        <td>{item.name}</td>
                        <td>
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "50px", height: "50px" }}
                        />
                        </td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}</td>
                        
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default Cart