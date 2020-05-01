import React from 'react';
import StarRatings from 'react-star-ratings';


function reviewItem (props){

    var id = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return (
        <div>
        <h7><b>Buyer: </b> {id} </h7>
        <br/>
        <StarRatings
        rating={props.rating}
        starRatedColor="blue"
        numberOfStars={5}
        starDimension={20}
        />
        <br/>
        <h8>{"d"}</h8>
        <hr/>
    </div>
    )
}

export default reviewItem