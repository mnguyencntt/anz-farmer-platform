import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './orders.css';

const OrderItem = ( {order} ) => {
  const {orderId, products, date} = order;
  let orderTotalPrice = 0;
  products.forEach(prod => {
    orderTotalPrice += prod.totalPrice; 
  });
  return ( 
    <div className="order">
      <div className="row order_hdr">
        <div className="col s2">{new Date().toDateString()}</div>
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
        <div className="col s2 ">
          <Link to="/order">
            <a className="waves-effect waves-light btn-small blue lighten-2">Details</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

const Orders = ( {orders} ) => {
  return (
    <div className="container">
      <h3>All orders</h3>
      <div>
        {orders.map(order => <OrderItem 
          order={order} />)}
      </div>
    </div>
  );
}

const fakeOrders = [
  {
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
      "date": 123123123,
      "buyerId": "erww456",
      "orderId": "asdf123",
  },
  {
      "products": [
          {
              "productId": "asfwer123",
              product: {"id":"5ea1a2a47551eee86bcf99dc","img":"https://cdn.opentaste.sg/p/?id=16217129.0-10130db7c8c51fb170b0b960186cd717&size=620x0&format=jpg","title":"Avocado","desc":"Avocado Hass","unit":"100 G","price":12,"quantity":1},
              "quantity": 1,
              "sellerId": "asfwer123",
              "totalPrice": 46
          },
          {
              product: {"id":"5ea1a2a37551eee86bcf99db","img":"https://cdn.opentaste.sg/p/?id=16219759.0-c96b04f8c5f2cce68e6d3c7653470263&size=620x620&format=jpg","title":"Wagyu Beef","desc":"Grass Fed Wagyu Beef MS 3/4 Striplion","unit":"220 G","price":80,"quantity":1},
              "productId": "asfwer456",
              "quantity": 3,
              "sellerId": "asfwer123",
              "totalPrice": 56
          }
      ],
      "date": 123123123,
      "buyerId": "asfwer123",
      "orderId": "qwe123",
  }
];

const mapStateToProps = state => ({
  // orders: state.orders,
  orders: fakeOrders,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);