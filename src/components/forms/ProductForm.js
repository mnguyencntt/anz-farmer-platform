import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { getProduct, updateProduct, addUsernameInfo, addTokenIdInfo } from '../actions/cartActions'

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
      this.props.getProduct(id)
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

    let params = {
      _id: this.props.item.id,
      name: this.state.title || this.props.title,
      description: this.state.desc || this.props.desc,
      price: this.state.price || this.props.price,
      unit: this.state.unit || this.props.unit,
      image_url: this.state.img || this.props.img,
    }
    this.props.updateProduct(params, this.state.auth_id_token)
  }

  render() {
    // const { error, isLoaded, isLogin, isPayment } = this.state;
    // if (isLoaded == null) {
    if (!this.props.item) {
        return (
          <div className="container">
            <h2>Create Product</h2>
          </div>
        );
    } else {
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>Edit Product</h2>
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
        price: state.price
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getProduct: (params) => { dispatch(getProduct(params)) },
        updateProduct: (params, token) => { dispatch(updateProduct(params, token)) }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductForm)
