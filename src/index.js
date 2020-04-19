import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import Item1 from './images/products/Mango.jpeg'
import Item2 from './images/products/Beef.jpeg'
import Item3 from './images/products/Avocado.jpeg'
import Item4 from './images/products/BlueBerries.jpeg'
import Item5 from './images/products/Chicken.jpeg'
import Item6 from './images/products/Banana.jpeg'
import Item7 from './images/products/Strawberry.jpeg'
import Item8 from './images/products/Bread.jpeg'
import Item9 from './images/products/Asparagus.jpeg'

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
const middlewares=[thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store=createStore(
  cartReducer,
  initState,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
)
// const store = createStore(cartReducer);

class MainPage extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
ReactDOM.render(<MainPage />, document.getElementById('root'));

