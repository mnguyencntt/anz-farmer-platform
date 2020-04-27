import React from 'react';
import axios from "axios";
import StarRatings from 'react-star-ratings';


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

class ProductReview extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            productId: this.props.productId ? this.props.productId : '5ea1a2a47551eee86bcf99dc'
        }
        this.reviewItem = this.reviewItem.bind(this);
    }

    componentDidMount() {

        if(localStorage.auth_id_token){
            const data =[{
                buyerId: this.state.productId, // use buyId columns for testing purpose
                httpMethod : 'GET'
            }]
            axios.get('https://q6cv43gwml.execute-api.ap-southeast-1.amazonaws.com/prod/productreviews', 
            {
              headers: {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.auth_id_token
                // 'Authorization' : 'eyJraWQiOiJQZCtjOGtGSzZBSXRnb3RrU2w4dmtkcnIyS0o5eXdSdEVmVzVudmFGOGZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNmU3ODMyYi1lNTNhLTQyY2MtYTM3NS04MDM5ZWQxYjNhMjIiLCJhdWQiOiIzOG9jcTNvc2N0ZXQydnZ0N2gwM2RqamU5NSIsImV2ZW50X2lkIjoiNDZjNWEwM2EtODU5OS00YjZkLWJiMDgtZjdmODEwNmE1NzM4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODc0NzU4NzEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMl9JWnVoaHhTZnciLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdHVzZXIiLCJleHAiOjE1ODc0Nzk0NzEsImlhdCI6MTU4NzQ3NTg3MX0.VcnMFvxeaNNr6X1bNXYifTX7BkwgZI5qr-H2CgW-CYrDvbvKKJYxIT2riXaYqHz7C-T1gzOcixW2MRIatBMOlS6cOUNGOXCfULfu8R8o8USX-3XSl38gsuePmpVHUjivQmYR1mAQTlsKbqjwrV6rqmJG1AluxKhuffrLY-dmCd87aSI1lLnQ38zk4ycx8a7Sf9ZY_dE_gMOsO25SYWXMw72AWgSFE_chVJs4BTYug_2gwMSVqQMHzqmHvUo0qXCZa6ez6frHXcRyKY8rK-7zqtQdOfVyzJGh9uNqLFEIg9b5t9RPthuVwykUoc0vatP1CgAdr535XKJp5TE10HQZwA'
              },
              body:data
              
            })
            .then(res => {
              console.log(res);
            })
            .catch(error => {
              console.log(error);
             // alert("(Unauthorized token / expired token / error on calling API)");
            });
        }

    }

    reviewItem = (rating, msg)=>{
        return(
        <div >
            <h7>User {makeid(8)} </h7>
            <br/>
            <StarRatings
            rating={rating}
            starRatedColor="blue"
            numberOfStars={5}
            starDimension={20}
            />
            <br/>
            <h8>{msg}</h8>
            <hr/>
        </div>
        )
    }

    render(){
        return(
            <div style={{width:"50vw", margin:"auto"}}>
                <h5>Ratings & Reviews</h5>
                {this.reviewItem(4,"d")}
            </div>
        )
    }
}
export default ProductReview