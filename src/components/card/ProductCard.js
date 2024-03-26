import React from 'react'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const ProductCard = ({data}) => {
  return (
    <Card
      style={{
        width: 300
      }}
      cover={
        <img
          alt="example"
          src={'http://localhost:5000/uploads/' + data.image}
          style={
            {
              width: '100%',
              height: 200
            }
          }
        />
      }
      // actions={[
      //   <SettingOutlined key="setting" />,
      //   <EditOutlined key="edit" />,
      //   <EllipsisOutlined key="ellipsis" />,
      // ]}
    >
      <Meta
        title={data.name}
        description={data.detail + ' ราคา ' + data.price + ' บาท'}
      />
    </Card>
  );
}

export default ProductCard