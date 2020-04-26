import React from 'react';
import { connect } from 'react-redux';
import './orders.css';

const OrderDetail = ( {order} ) => {
  const {orderId, products, date} = order;
  let orderTotalPrice = 0;
  products.forEach(prod => {
    orderTotalPrice += prod.totalPrice; 
  });
  return ( 
    <div className="order_detail">
      <div className="row order_hdr">
        <div className="col s2">{new Date(date).toDateString()}</div>
        <div className="col s3">Order No: {orderId}</div>
        <div className="col s7"></div>
      </div>
      {products.map((product) => {
        const {product: item, quantity, totalPrice} = product;
        return (
          <div className="row">
            <div className="col s9 ">
              <ul className="collection">
                <li className="collection-item avatar" key={item.id}>
                  <div className="item-img"> 
                      <img src={item.img} alt={item.img} className=""/>
                  </div>
                  <div className="item-desc">
                      <span className="title">{item.title}</span>
                      <p>{item.desc}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col s1 ">{quantity}</div>
            <div className="col s2 ">S${totalPrice}</div>
          </div>
        );
      })}
      <div className="row">
        <div className="col s10 ">Total price: S${orderTotalPrice}</div>
      </div>
    </div>
  );
}

const DeliveryDetail = ( ({delivery}) => {
  const { id, address, status, company} = delivery;

  return (
    <div>
      <div className="row order_hdr">
        <div className="col s12">Delivery</div>
      </div>
      <div className="row delivery_row">
        <div className="col s2">Status</div>
        <div className="col s10">{status}</div>
      </div>
      <div className="row delivery_row">
        <div className="col s2">Delivery Address</div>
        <div className="col s10">{address}</div>
      </div>
      <div className="row delivery_row">
        <div className="col s2">Delivery No.</div>
        <div className="col s10">{id}</div>
      </div>
      <div className="row delivery_row">
        <div className="col s2">Delivery Vender</div>
        <div className="col s10">{company}</div>
      </div>
    </div>
  );
});

const Order = ( {order} ) => {
  return (
    <div className="container">
      <h3>Order Details</h3>
      <div>
        <DeliveryDetail delivery={order.delivery} />
        <OrderDetail order={order} />
      </div>
    </div>
  );
}

const fakeOrder = {
  "products": [
      {
          "productId": "asfwer123",
          product: {"id":"5ea1a2a37551eee86bcf99db","img":"https://cdn.opentaste.sg/p/?id=16219759.0-c96b04f8c5f2cce68e6d3c7653470263&size=620x620&format=jpg","title":"Wagyu Beef","desc":"Grass Fed Wagyu Beef MS 3/4 Striplion","unit":"220 G","price":80,"quantity":1},
          "quantity": 2,
          "sellerId": "asfwer123",
          "totalPrice": 4561
      },
      {
          "productId": "asfwer456",
          product: {"id":"5ea1a2a47551eee86bcf99dc","img":"https://cdn.opentaste.sg/p/?id=16217129.0-10130db7c8c51fb170b0b960186cd717&size=620x0&format=jpg","title":"Avocado","desc":"Avocado Hass","unit":"100 G","price":12,"quantity":1},
          "quantity": 3,
          "sellerId": "asfwer123",
          "totalPrice": 4560
      }
  ],
  "date": 1567879214315,
  "buyerId": "erww456",
  "orderId": "asdf123",
  "deliveryId": "asdufo123123afs",
  "delivery": {
    "id": "asdufo123123afs",
    "address": "Ayer Rajer Crescent, singapore 134612",
    "status": "Delivered",
    "company": "Ninja Van"
  }
};

const mapStateToProps = state => ({
  // orders: state.orders,
  order: fakeOrder,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);