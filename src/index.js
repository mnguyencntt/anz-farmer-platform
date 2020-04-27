import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Item1 from './images/products/Mango.jpeg'
import Item2 from './images/products/Beef.jpeg'
import Item3 from './images/products/Avocado.jpeg'
import Item4 from './images/products/BlueBerries.jpeg'
import Item5 from './images/products/Chicken.jpeg'
import Item6 from './images/products/Banana.jpeg'
import Item7 from './images/products/Strawberry.jpeg'
import Item8 from './images/products/Bread.jpeg'
import Item9 from './images/products/Asparagus.jpeg'

const items = [
        { id:1, price: 10, img: Item1, title:'Mango', desc: "Mango Honey Golden Large" },
        { id:2, price: 80, img: Item2, title:'Wagyu Beef ', desc: "Grass Fed Wagyu Beef MS 3/4 Striplion" },
        { id:3, price: 12, img: Item3, title:'Avocado', desc: "Avocado Hass" },
        { id:4, price: 18, img: Item4, title:'Blueberries', desc: "Austuralia Blueberries" },
        { id:5, price: 16, img: Item5, title:'Chicken', desc: "Organic Kampung Chicken Breat Skinless" },
        { id:6, price: 11, img: Item6, title:'Banana', desc: "Banana Cavendish" },
        { id:7, price: 14, img: Item7, title:'Strawberry', desc: "Strawberry Korea" },
        { id:8, price: 10, img: Item8, title:'Bread', desc: "Organic Bread" },
        { id:9, price: 33, img: Item9, title:'Asparagus', desc: "Asparagus Large" }
    ]

const initState = {
  root: {
    addedItems:[],
    total: 0
  }
}

const persistConfig = {
  key: 'root',
  version: 0,
  debug: true,
  storage,
  stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store=createStore(
  persistedReducer,
  composeWithDevTools(
      applyMiddleware(thunk)
  )
);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
