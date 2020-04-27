import { GET_PRODUCTS_BEGIN,GET_PRODUCTS_SUCCESS,GET_PRODUCT_SUCCESS,UPDATE_PRODUCT_BEGIN,UPDATE_PRODUCT_SUCCESS,CREATE_PRODUCT_SUCCESS,SET_PRODUCTS,ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,ADD_USERNAMEINFO,ADD_TOKEN_ID_INFO,ADD_USER_DETAIL_INFO,ADD_DELIVERY_INFO } from '../actions/action-types/cart-actions'

const initState = {
  addedItems:[],
  total: 0
}

const cartReducer= (state=initState, action)=>{
    //INSIDE HOME COMPONENT
    if(action.type === GET_PRODUCTS_BEGIN){
        return{
            ...state,
            items: [],
            item: null
        }
    }
    if(action.type === GET_PRODUCTS_SUCCESS){
        // const products = action.payload.length > 0 ? action.payload : state.items
        return{
            ...state,
            items: action.payload,
            allItems: action.payload
        }
    }
    if(action.type === GET_PRODUCT_SUCCESS){
        // const products = action.payload.length > 0 ? action.payload : state.items
        let product = action.payload.length > 0 ? action.payload[0] : null;
        return{
            ...state,
            items: action.payload,
            item: product,
            img: product ? product.img : null,
            title: product ? product.title : null,
            desc: product ? product.desc : null,
            unit: product ? product.unit : null,
            price: product ? product.price : null,

        }
    }
    if(action.type === UPDATE_PRODUCT_BEGIN){
        return{
            ...state,
            isLoaded: 'loading'
        }
    }
    if(action.type === UPDATE_PRODUCT_SUCCESS){
        let product = action.payload;
        alert('Product updated successfully!')
        return{
            ...state,
            items: state.items,
            isLoaded: 'loaded',
            item: product,
            img: product ? product.img : null,
            title: product ? product.title : null,
            desc: product ? product.desc : null,
            unit: product ? product.unit : null,
            price: product ? product.price : null,

        }
    }
    if(action.type === CREATE_PRODUCT_SUCCESS){
        let product = action.payload;
        alert('Product created successfully!')
        return{
            ...state,
            items: state.items,
            item: product,
        }
    }
    if(action.type === SET_PRODUCTS){
        return{
            ...state,
            items: action.payload,
        }
    }
    if(action.type === ADD_TO_CART){
         let addedItem = state.items.find(item=> item.id === action.id)
         if (! addedItem) {
           addedItem = state.item
         }
         //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1
            //alert(addedItem.title + " was added to shopping cart.")
             return{
                ...state,
                 addedItems: [...state.addedItems],
                 total: state.total + addedItem.price
                }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price
            //alert(addedItem.title + " was added to shopping cart.")

            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }

        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }

    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== ADD_USERNAMEINFO){
        return{
            ...state,
            usernameInfo: action.id
        }
    }

    if(action.type=== ADD_TOKEN_ID_INFO){
        return{
            ...state,
            tokenIdInfo: action.id
        }
    }

    if(action.type=== ADD_USER_DETAIL_INFO){
        return{
            ...state,
            userDetailInfo: action.id
        }
    }

    if(action.type=== ADD_DELIVERY_INFO){
        return{
            ...state,
            deliveryInfo: action.id
        }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }

  else{
    return state
    }
}

export default cartReducer
