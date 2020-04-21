import axios from 'axios'
import { GET_PRODUCTS_BEGIN,GET_PRODUCTS_SUCCESS,ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,ADD_USERNAMEINFO,ADD_TOKEN_ID_INFO,ADD_USER_DETAIL_INFO,ADD_DELIVERY_INFO } from './action-types/cart-actions'


// Format the Products object returned by the API into our custom format
export const formatProducts=(products)=> {
    return products.map(product=>{
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

export const getProducts=(params)=>dispatch=>{
    // send a message first so that the UI knows we get the reqeust and start getting the products
    dispatch({
        type: GET_PRODUCTS_BEGIN,
    })

    const request = axios({
        method: 'GET',
        url: 'https://s2drs5dhbk.execute-api.ap-southeast-2.amazonaws.com/production/products',
        headers: { 'Content-Type' : 'application/json' }
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

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}

//remove item action
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}

//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}

//add qt action
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}

//add qt action
export const addUsernameInfo=(id)=>{
    return{
        type: ADD_USERNAMEINFO,
        id
    }
}

//add qt action
export const addTokenIdInfo=(id)=>{
    return{
        type: ADD_TOKEN_ID_INFO,
        id
    }
}

//add qt action
export const addUserDetailInfo=(id)=>{
    return{
        type: ADD_USER_DETAIL_INFO,
        id
    }
}
//add qt action
export const addDeliveryInfo=(id)=>{
    return{
        type: ADD_DELIVERY_INFO,
        id
    }
}