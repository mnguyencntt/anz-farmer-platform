import axios from 'axios';
import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_BEGIN,
    UPDATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    SET_PRODUCTS,
    ADD_TO_CART,
    REMOVE_ITEM,
    ADD_SHIPPING,
    ADD_USERNAMEINFO,
    ADD_PASSWORDINFO,
    ADD_TOKEN_ID_INFO,
    ADD_USER_DETAIL_INFO,
    ADD_PAYMENT_INFO,
    ADD_DELIVERY_INFO,
    ADD_NOTIFICATION_INFO,
    ADD_ORDER_INFO,
    AUTHENTICATING_USER,
    AUTHENTICATE_USER_FAILURE,
    AUTHENTICATE_USER_SUCCESS,
    LOGOUT_USER,
    GET_USER_SHOPPING_CART_SUCCESS,
    MODIFY_QUANTITY,
    GET_REVIEW_LIST
} from './action-types/cart-actions'
    ;

// Format the Products object returned by the API into our custom format
export const formatProducts = (products) => {
    return products.map(product => {
        return {
            id: product._id,
            img: product.image_url,
            title: product.name,
            desc: product.description,
            unit: product.unit,
            price: product.price
        }
    })
}

export const formatProduct = (product) => {
    return {
        id: product._id,
        img: product.image_url,
        title: product.name,
        desc: product.description,
        unit: product.unit,
        price: product.price
    }
}

export const getProducts = (params) => dispatch => {
    // send a message first so that the UI knows we get the reqeust and start getting the products
    dispatch({
        type: GET_PRODUCTS_BEGIN,
    })
    var url = 'https://s2drs5dhbk.execute-api.ap-southeast-2.amazonaws.com/production/products?';
    if (params) {
        url += params;
    }

    const request = axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'application/json' }
    });

    // dispatch the result to UI for it to render the products
    return request.then(res => {
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: formatProducts(res.data)
        })
    });
    // .catch(error=>{
    // dispatch({
    // type: GET_PRODUCTS_FAIL,
    // payload: {error}
    // })
    // return error
    // })
}

export const getProduct = (id) => dispatch => {
    // send a message first so that the UI knows we get the reqeust and start getting the products
    dispatch({
        type: GET_PRODUCTS_BEGIN,
    })
    var url = 'https://s2drs5dhbk.execute-api.ap-southeast-2.amazonaws.com/production/products?_id=' + id;
    const request = axios({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'application/json' },
    });

    // dispatch the result to UI for it to render the products
    return request.then(res => {
        const product = formatProducts(res.data);
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: product
        })
    });
}

export const updateProduct = (params, token) => dispatch => {
    // send a message first so that the UI knows we get the reqeust and start getting the products
    dispatch({
        type: UPDATE_PRODUCT_BEGIN,
    })
    var url = 'https://s2drs5dhbk.execute-api.ap-southeast-2.amazonaws.com/production/products';
    const request = axios({
        method: 'PATCH',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });

    // dispatch the result to UI for it to render the products
    return request.then(res => {
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: formatProduct(res.data)
        })
    })
        .catch(error => {
            // dispatch({
            // type: GET_PRODUCTS_FAIL,
            // payload: {error}
            // })
            alert('Update product failed. Mostly your token expired, please re-login and try again.')
            return error
        })
}

export const createProduct = (params, token) => dispatch => {
    // send a message first so that the UI knows we get the reqeust and start getting the products
    dispatch({
        type: UPDATE_PRODUCT_BEGIN,
    })
    var url = 'https://s2drs5dhbk.execute-api.ap-southeast-2.amazonaws.com/production/products';
    const request = axios({
        method: 'POST',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });

    // dispatch the result to UI for it to render the products
    return request.then(res => {
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: formatProduct(res.data)
        })
    })
        .catch(error => {
            // dispatch({
            // type: GET_PRODUCTS_FAIL,
            // payload: {error}
            // })
            alert('Create product failed. Mostly your token expired, please re-login and try again.')
            return error
        })
}

export const setProducts = (products) => dispatch => {
    // send a message first so that the UI knows we get the reqeust and start getting the products
    dispatch({
        type: SET_PRODUCTS,
        payload: products
    });
}

//add cart action
export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
}

//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}

export const modifyQuantity = (id, newQuantity) => ({
  type: MODIFY_QUANTITY,
  payload: {id, newQuantity},
})

//add qt action
export const addUsernameInfo = (id) => {
    return {
        type: ADD_USERNAMEINFO,
        id
    }
}

//add qt action
export const addPasswordInfo = (id) => {
    return {
        type: ADD_PASSWORDINFO,
        id
    }
}

//add qt action
export const addTokenIdInfo = (id) => {
    return {
        type: ADD_TOKEN_ID_INFO,
        id
    }
}

//add qt action
export const addUserDetailInfo = (id) => {
    return {
        type: ADD_USER_DETAIL_INFO,
        id
    }
}

//add qt action
export const addPaymentInfo = (id) => {
    return {
        type: ADD_PAYMENT_INFO,
        id
    }
}

//add qt action
export const addDeliveryInfo = (id) => {
    return {
        type: ADD_DELIVERY_INFO,
        id
    }
}

//add qt action
export const addNotificationInfo = (id) => {
    return {
        type: ADD_NOTIFICATION_INFO,
        id
    }
}

//add qt action
export const addOrderInfo = (id) => {
    return {
        type: ADD_ORDER_INFO,
        id
    }
}

export const authenticatingUser = () => ({
  type: AUTHENTICATING_USER
});

export const authenticateUserSuccess = (username, token) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: {username, token}
});

export const authenticateUserFailure = () => ({
  type: AUTHENTICATE_USER_FAILURE
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const getUserShoppingCartSuccess = (products) => ({
  type: GET_USER_SHOPPING_CART_SUCCESS,
  payload: { products}
});

export const getReviewList = (list) =>({
    type: GET_REVIEW_LIST,
    list
})