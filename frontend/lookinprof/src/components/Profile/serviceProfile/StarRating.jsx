import React from 'react'
import {ReactComponent as StarIcon} from "../serviceProfile/Star.svg"

const StarRating = ({rating}) => {
    const stars = [];
    for(let i = 0; i < rating ; i++){
        stars.push(<StarIcon key={i}/>)
    }
  
  
    return (
    <div className='flex gap-2 justify-center p-1'>
        {stars}
    </div>
)
}

export default StarRating