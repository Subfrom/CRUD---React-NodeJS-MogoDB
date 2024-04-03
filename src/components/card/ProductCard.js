import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const ProductCard = ({data}) => {

  const { user } = useSelector(state => ({ ...state }));
  const { cart } = useSelector(state => ({ ...state }));

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // console.log(product);
    dispatch(addToCart(product));
  };

  let actions;

  if (user.user && user.user.role === "admin") {
    actions = [
      <span onClick={() => handleAddToCart(data)} >
        <ShoppingCartOutlined />
        <span style={{ paddingLeft: 8 }}>Add to Cart</span>
      </span>,
      <span>
        <EditOutlined key="edit" />
        <span style={{ paddingLeft: 8 }}>Edit</span>
      </span>,
      <span>
        <DeleteOutlined />
        <span style={{ paddingLeft: 8 }}>Delete</span>
      </span>,
    ];
  } else if (user.user && user.user.role === "user"){
    actions = [
      <span>
        <ShoppingCartOutlined />
        <span style={{ paddingLeft: 8 }}>Add to Cart</span>
      </span>,
    ];
  } else {
    actions = [];
  }

  return (
    <Card
      style={{
        width: 400,
        borderRadius: 15,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}
      cover={
        <img
          alt="example"
          src={'http://localhost:5000/uploads/' + data.image}
          style={
            {
              width: '100%',
              height: 200,
              objectFit: 'cover'
            }
          }
        />
      }
      actions={actions}
    >
      <Meta
        title={data.name}
        description={data.detail + ' ราคา ' + data.price + ' บาท'}
        style={{ padding: '0 15px' }}
      />
    </Card>
  );
}

export default ProductCard