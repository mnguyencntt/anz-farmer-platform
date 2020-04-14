import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(cartReducer);

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

