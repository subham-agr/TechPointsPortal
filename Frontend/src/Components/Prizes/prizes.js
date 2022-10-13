import React from 'react'
import Avatar from '../../static/images/avatar/1.jpeg'
// import './catalouge.css'

export default function Prize() {
  return (
    <div className='Card'>
      <div className="image-card">
        <img src={Avatar} className="image" alt="Image of Product" />
      </div>
      <div className="details">
        <div className="item-name">
            <h3 className='heading'>Name</h3>
        </div>
        <div className="item-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, praesentium.
        </div>
      </div>
      <div className="reedem">
        <div className="price">
            <h4>200Points</h4>
        </div>
        <div className="reedem-btn">
            <button>Reedem</button>
        </div>
        <div className="cart-btn">
            <button>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
