import axios from "axios";
import { authenticatingUser, authenticateUserFailure, authenticateUserSuccess, getUserShoppingCartSuccess, addToCart, addQuantity, removeItem, modifyQuantity } from "../actions/cartActions"
import { URL_AUTHENTICATION, URL_CART } from "../config";

export const authenticateUser = (username, password) => async dispatch => {
  try {
    dispatch(authenticatingUser());
    const authRes = await axios.post(
      URL_AUTHENTICATION,
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });

    const { status, id_token: token } = authRes.data;
    if (status !== 'success') {
      return dispatch(authenticateUserFailure());
    }
    dispatch(authenticateUserSuccess(username, token));

    // get cart, will overwrite local one
    const cartRes = await axios.get(
      URL_CART,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      }
    )

    dispatch(getUserShoppingCartSuccess(cartRes.data.ShoppingCart.products))
  } catch (e) {
    dispatch(authenticateUserFailure());
    console.error(e);
  }
}

export const addProductToCart = (productId, quantity, token) => async dispatch => {
  try {
    if (token) {
      const cartRes = await axios.post(
        URL_CART,
        {products: [{
          productId,
          quantity,
        }]},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        }
      )
      dispatch(getUserShoppingCartSuccess(cartRes.data.ShoppingCart.products))
    } else {
      dispatch(addToCart(productId));
    }
  } catch (e) {
    console.error(e);
  }
}

export const modifyQuantityInCart = (productId, quantity, token) => async dispatch => {
  try {
    if (token) {
      const cartRes = await axios.patch(
        URL_CART,
        {products: [{
          productId,
          quantity,
        }]},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        }
      )
      dispatch(getUserShoppingCartSuccess(cartRes.data.ShoppingCart.products))
    } else {
      dispatch(modifyQuantity(productId, quantity));
    }
  } catch (e) {
    console.error(e)
  }
}

export const removeFromCart = (productId, token) => async dispatch => {
  try {
    if (token) {
      const cartRes = await axios.delete(
        `${URL_CART}?id=${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        }
      )
      dispatch(getUserShoppingCartSuccess(cartRes.data.ShoppingCart.products))
    } else {
      dispatch(removeItem(productId));
    }
  } catch (e) {
    console.error(e);
  }

}