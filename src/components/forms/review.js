import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { getReviewList } from '../actions/cartActions';

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

const generateId = (length) =>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return result;
}

class ProductReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.productId ? this.props.productId : '5ea1a2a47551eee86bcf99dc',
            token: this.props.token,
            rating: 5,
            reviewMsg: '',
            isFormCompleted: null,
            isReviewUpload: null,
            isPost:null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
              }
        }
         
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

    handleSubmit=(e)=>{
        e.preventDefault();
             const {rating,reviewMsg,productId,headers} = this.state;
             const data = {
                reviewId : generateId(15),
                buyerId: generateId(15),
                productId: productId,
                reviewMsg: reviewMsg,
                rating: rating
             }
            if(reviewMsg!==''&&productId!=='' &&rating!==''){
                axios.post('https://q6cv43gwml.execute-api.ap-southeast-1.amazonaws.com/prod/productreviews', data, { headers })
                .then(res => {
                    console.log('success submit review with token');
                    this.setState({ isReviewUpload: true });
                    
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

                    this.setState({isPost:true});
                })
                .catch(error => {
                    console.log(error);
                });

        }
        else{
            this.setState({isFormCompleted:false});
            return;
        }
        
        
    }

    cb(e){
        let input = e.target.value;
        if(input > 5){input = 5;}else if(input < 1){input=1;}
        this.setState({rating:input});
    }

    textchanged(e){

        let review = e.target.value;
        this.setState({reviewMsg: review});
    }
    render() {
        const lt = this.props.reviewList;
        let isLogin = false;
        let err = null; let msg = null;
        if(this.props.token !==null){
            isLogin = true;
        }
        
        if(this.state.isPost===true){
            isLogin = false;
            msg = (<div><p>Thank you! Your review have been posted successfully!</p></div>);
        }

        if(this.state.isFormCompleted==false){
            err = (<div><p>*Error message: Invalid input!</p></div>);
        }


        if (lt){
          if(isLogin){
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
                <form onSubmit={this.handleSubmit} >
                {err}
                <h5>Post review : </h5>
                <div style={{border:" 1px #c0c0c0 solid"}}>
                <div style={{margin:"1%"}}>
                <p>Rating: (from 1 to 5)</p>
                <input type="number" name="rating" style={{width:'50px'}} value={this.state.rating} onChange={this.cb.bind(this)}  />
                <br/>
                <StarRatings
                  rating={Number(this.state.rating)}
                  starRatedColor="blue"
                  numberOfStars={Number(this.state.rating)}
                  starDimension="20"
                  />
                <h6>Help us to improve our service : </h6>
                <textarea onChange={this.textchanged.bind(this)} value={this.state.reviewMsg} >
                </textarea>
                <br/>
                <input type="submit" value="SUBMIT" className="waves-effect waves-light btn" />
                </div>
                </div>
                </form>
               
                </>
            )
          }
          else{
            return(
                <>
                {msg}
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
          
        } else {
          return null;
        }
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
