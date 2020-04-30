import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Recipe from './Recipe'
import { modifyQuantityInCart, removeFromCart } from './reducers/thunks';

const Cart = ({addedItems, token, modifyQuantityInCart, removeFromCart}) => {
  const itemsComponent = addedItems.length ?
    (
      addedItems.map(item => {
        return (

          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.img} alt={item.img} className="" />
            </div>

            <div className="item-desc">
              <span className="title">{item.title}</span>
              <p>{item.desc}</p>
              <p><b>Price: {item.price}$</b></p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart"><i className="material-icons" onClick={() => { modifyQuantityInCart(item.id, item.quantity + 1, token) }}>arrow_drop_up</i></Link>
                <Link to="/cart"><i className="material-icons" onClick={() => { const quantity = item.quantity - 1; quantity > 0 ? modifyQuantityInCart(item.id, quantity,  token): removeFromCart(item.id, token); }}>arrow_drop_down</i></Link>
              </div>
              <button className="waves-effect waves-light btn pink remove" onClick={() => { removeFromCart(item.id, token) }}>Remove</button>
            </div>

          </li>

        )
      })
    ) :

    (
      <p>Nothing.</p>
    )
  return (
    <div className="container">
      <div className="cart">
        <h5>You have ordered:</h5>
        <ul className="collection">
          {itemsComponent}
        </ul>
      </div>
      <Recipe />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    token: state.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modifyQuantityInCart: (productId, quantity, token) => { dispatch(modifyQuantityInCart(productId, quantity, token))},
    removeFromCart: (productId, token) => {dispatch(removeFromCart(productId, token))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
