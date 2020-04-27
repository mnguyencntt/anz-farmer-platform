import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { getProduct, updateProduct, createProduct, addUsernameInfo, addTokenIdInfo } from '../actions/cartActions'

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: null,
      isLoaded: null,
      isLogin: null,
      auth_id_token: localStorage.getItem('auth_id_token'),

      title: null,
      desc: null,
      unit: null,
      img: null,
      price: null
    };
  }

  componentDidMount() {
      const id = this.props.location.pathname.split("/").slice(-1)[0]
      if (id) {
          this.props.getProduct(id)
      }
  }

  handleChange(event) {
    if (event.target.name === "title") {
      this.setState({ title: event.target.value });
    } else if (event.target.name === "desc") {
      this.setState({ desc: event.target.value });
    } else if (event.target.name === "unit") {
      this.setState({ unit: event.target.value });
    } else if (event.target.name === "img") {
      this.setState({ img: event.target.value });
    } else if (event.target.name === "price") {
      this.setState({ price: event.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.props.item) {
      // update the product
      let params = {
        _id: this.props.item.id,
        name: this.state.title || this.props.title,
        description: this.state.desc || this.props.desc,
        price: this.state.price || this.props.price,
        unit: this.state.unit || this.props.unit,
        image_url: this.state.img || this.props.img,
      }
      this.props.updateProduct(params, this.state.auth_id_token)
    } else {
      // create new product
      let params = {
        name: this.state.title || this.props.title,
        description: this.state.desc || this.props.desc,
        price: this.state.price || this.props.price,
        unit: this.state.unit || this.props.unit,
        image_url: this.state.img || this.props.img,
        seller_id: this.props.usernameInfo
      }
      this.props.createProduct(params, this.state.auth_id_token)
    }
  }

  render() {
    // const { error, isLoaded, isLogin, isPayment } = this.state;
    // if (isLoaded == null) {
    // console.log(this.props)
    if (this.props.item && this.props.location.pathname.startsWith('/product-create')) {
        return <Redirect to='/product-management' />
    }
    if (!this.props.item) {
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <h2>Manage Product</h2>
              <label>
                Title:
                    <input type="text" name="title" placeholder='name of the roduct' onChange={this.handleChange} />
              </label>
              <label>
                Description:
                    <input type="text" name="desc" placeholder='product details' onChange={this.handleChange} />
              </label>
              <label>
                Unit:
                    <input type="text" name="unit" placeholder='sold unit, e.g. 100 G or 100 ML' onChange={this.handleChange} />
              </label>
              <label>
                Price:
                    <input type="text" name="price" placeholder='price per unit' onChange={this.handleChange} />
              </label>
              <label>
                Image URL:
                    <input type="text" name="img" placeholder='URL of the product image' onChange={this.handleChange} />
              </label>
              <p></p>
              <input type="submit" className="btn btn-success" value="Create" />
              <Link to={"/product-management/"}>
                  <button className="btn grey right" >Cancel</button>
              </Link>
            </form>
          </div>
        );
    } else {
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>Manage Product</h2>
            <label>
              Title:
                  <input type="text" name="title" defaultValue={this.props.title} onChange={this.handleChange} />
            </label>
            <label>
              Description:
                  <input type="text" name="desc" defaultValue={this.props.desc} onChange={this.handleChange} />
            </label>
            <label>
              Unit:
                  <input type="text" name="unit" defaultValue={this.props.unit} onChange={this.handleChange} />
            </label>
            <label>
              Price:
                  <input type="text" name="price" defaultValue={this.props.price} onChange={this.handleChange} />
            </label>
            <label>
              Image URL:
                  <input type="text" name="img" defaultValue={this.props.img} onChange={this.handleChange} />
            </label>
            <p></p>
            <input type="submit" className="btn btn-success" value="Save" />
            <Link to={"/product-management/"}>
                <button className="btn grey right" >Cancel</button>
            </Link>
            </form>
          </div>
        );
    }
  }
}

const mapStateToProps = (state)=>{
    return {
        item: state.item,
        img: state.img,
        title: state.title,
        desc: state.desc,
        unit: state.unit,
        price: state.price,
        isLoaded: state.isLoaded,
        usernameInfo: state.usernameInfo
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getProduct: (params) => { dispatch(getProduct(params)) },
        updateProduct: (params, token) => { dispatch(updateProduct(params, token)) },
        createProduct: (params, token) => { dispatch(createProduct(params, token)) }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductForm)
