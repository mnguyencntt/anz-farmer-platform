import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProducts, setProducts } from './actions/cartActions'
import { Link } from 'react-router-dom'

class ProductManagement extends Component {

    componentDidMount() {
        // console.log(this.props.usernameInfo)
        this.props.getProducts("seller_id=" + this.props.usernameInfo)
    }

    handleChange = (value) => {
      let excludeColumns = ["id", "price", "unit", "img"];
      const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") {
            this.setState({ items: this.props.allItems });
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
                            <img src={item.img} alt={item.title} />
                            <span className="card-title">{item.title}</span>
                            <Link to={"/product-edit/" + item.id}>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></span>
                            </Link>
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
                <h3 className="center">Your Products   <Link to={"/product-create/"}><button type="button" className="btn btn-success">Create</button></Link></h3>
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
        usernameInfo: state.usernameInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (params) => { dispatch(getProducts(params)) },
        setProducts: (products) => { dispatch(setProducts(products)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManagement)
