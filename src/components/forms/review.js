import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { getReviewList } from '../actions/cartActions';
import reviewItem from '../../components/forms/reviewItem'

const formatReviews = (reviews) => {
    const arr = []

    reviews.map((item) => {

        const a = {
            rating: item.rating,
            reviewMsg: item.reviewMsg,
            buyerId: item.buyerId
        }
        arr.push(a);
    }
    )

    return arr;
}


class ProductReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.productId ? this.props.productId : '5ea1a2a47551eee86bcf99dc'
        }
        // this.reviewItem = this.reviewItem.bind(this);
    }


    componentDidMount() {
        axios.get('https://q6cv43gwml.execute-api.ap-southeast-1.amazonaws.com/prod/productreviews?productId=' + this.state.productId,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {

                const resJson = JSON.parse(res.data.body);
                const responseReview = formatReviews(resJson);
                this.props.getReviewList(responseReview);
                 
            })
            .catch(error => {
                console.log(error);
            });


    }

     randomId =()=>{
        var id = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 8; i++) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return id;
    }
    render() {
        const lt = this.props.reviewList;
        return(
            <>
            {lt.map((item,key)=>
              <div key={key}>
              <p><b>Buyer: </b>{item.buyerId}</p>
              <StarRatings
              rating={Number(item.rating)}
              starRatedColor="blue"
              numberOfStars={Number(item.rating)}
              starDimension="20"
              />
              <p>{item.reviewMsg}</p>
              <hr/>
            </div>
            )}
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.token,
        reviewList: state.reviewList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewList: (list) => { dispatch(getReviewList(list)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview)