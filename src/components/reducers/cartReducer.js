import Item1 from '../../images/products/Mango.jpeg'
import Item2 from '../../images/products/Beef.jpeg'
import Item3 from '../../images/products/Avocado.jpeg'
import Item4 from '../../images/products/BlueBerries.jpeg'
import Item5 from '../../images/products/Chicken.jpeg'
import Item6 from '../../images/products/Banana.jpeg'
import Item7 from '../../images/products/Strawberry.jpeg'
import Item8 from '../../images/products/Bread.jpeg'
import Item9 from '../../images/products/Asparagus.jpeg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'

const initState = {
    items: [
        { id:1, price: 10, img: Item1, title:'MANGO', desc: "3 X MANGO HONEY GOLDEN LARGE" },
        { id:2, price: 80, img: Item2, title:'WAGYU BEEF', desc: "2 X GRASS FED WAGYU BEEF MS 3/4 STRIPLOIN 220G" },
        { id:3, price: 12, img: Item3, title:'AVOCADO', desc: "6 X AVOCADO HASS" },
        { id:4, price: 18, img: Item4, title:'BLUEBERRIES', desc: "3 X BLUEBERRIES 125G" },
        { id:5, price: 16, img: Item5, title:'CHICKEN', desc: "2 X ORGANIC KAMPUNG CHICKEN BREAST SKINLESS 350G" },
        { id:6, price: 11, img: Item6, title:'BANANA', desc: "12 X BANANA CAVENDISH" },
        { id:7, price: 14, img: Item7, title:'STRAWBERRY', desc: "2 X STRAWBERRY KOREA 250G" },
        { id:8, price: 10, img: Item8, title:'BREAD', desc: "ORGANIC BREAD 700G" },
        { id:9, price: 33, img: Item9, title:'ASPARAGUS', desc: "2 X ASPARAGUS LARGE 200G" }
    ],
    addedItems:[],
    total: 0
}

const cartReducer= (state = initState,action)=>{
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
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
