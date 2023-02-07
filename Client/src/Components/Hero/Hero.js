import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../Style/style.css"
import veg from '../images/veg.png';


const Hero = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate('/shop')
  }
  return (
    <div className="hero">
        <div className="row container d-flex">
          <div className="col">
            <span className="subtitle">Bumper Offer Sell Vegetables &</span>
            <h1>fru<span className="i">i</span>ts</h1>
            <p>CONNECTING CONSUMER AND FARMER ONLINE</p>

            <button style={{cursor:"pointer"}} onClick={handleClick} className="btn2">Explore Now!</button>
          </div>
          <img src={veg} alt="" style={{height:"100%", width:"40%"}}/>
        </div>
      </div>
  )
}

export default Hero
