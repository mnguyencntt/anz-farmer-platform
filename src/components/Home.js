import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, getProducts, setProducts, addUsernameInfo } from './actions/cartActions'
import { Link } from 'react-router-dom'
import { addProductToCart } from './reducers/thunks';

class Home extends Component {

    componentDidMount() {
        this.props.getProducts(null)

        if (!this.props.usernameInfo) {
            this.props.addUsernameInfo('MinhNguyenUserInit');
        }
    }

    handleClick = (id) => {
      const { addProductToCart, token } = this.props;
      addProductToCart(id, 1, token);
    }

    handleChange = (value) => {
      let excludeColumns = ["id", "price", "unit", "img"];
      const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") {
            this.props.setProducts(this.props.allItems);
        } else {
            const filteredItems = this.props.allItems.filter(item => {
                return Object.keys(item).some(key =>
                    excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            this.props.setProducts(filteredItems);
        }
    }

    render() {
        let itemList = []
        if (this.props.items) {
            itemList = this.props.items.map(item => {
                return (
                    <div className="card" key={item.id}>
                        <div className="card-image">
                            <Link to={"/product/" + item.id}>
                              <img src={item.img} alt={item.title} />
                            </Link>
                            <span className="card-title">{item.title}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(item.id) }}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p>{item.unit}</p>
                            <p><b>Price: {item.price}$</b></p>
                        </div>
                    </div>

                )
            })
        }

        return (
            <div className="container">
                <h3 className="center">Products</h3>
                  <div className="row">
                    <b>Search:</b> <input
                      style={{ marginLeft: 5 }}
                      type="text"
                      placeholder="Type to search..."
                      onChange={e => this.handleChange(e.target.value)}
                    />
                  </div>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        allItems: state.allItems,
        addedItems: state.addedItems,
        usernameInfo: state.usernameInfo,
        token: state.token,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        addUsernameInfo: (id) => { dispatch(addUsernameInfo(id)) },
        getProducts: (params) => { dispatch(getProducts(params)) },
        setProducts: (products) => { dispatch(setProducts(products)) },
        addProductToCart: (productId, quantity, token) => { 
          dispatch(addProductToCart(productId, quantity, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
