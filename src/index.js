import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'


const initState = { addedItems: [], total: 0 }
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

