import React from 'react';
import "../Style/style.css"

const Statistics = () => {
  return (
    <section className="section statistics">
      <div className="title">
        <span>STATS</span>
        <h2>Our Statistics</h2>
      </div>

      <div className="row container">
        <div className="col">
          <div className="icon">
            <i className="bx bxs-store"></i>
          </div>
          <h3>Easy Order System</h3>
          <p>Easy order system is a simple and user-friendly process for placing orders in retail. The goal is to make ordering quick and effortless for customers.</p>
        </div>
        <div className="col">
          <div className="icon">
            <i className="bx bxs-chat"></i>
          </div>
          <h3>Real Time Chat With Farmer</h3>
          <p>Real-Time Chat With Farmer is a direct communication system between customers and farmers for immediate answers and improved customer experience.</p>
        </div>
        <div className="col">
          <div className="icon">
            <i className="bx bxs-check-square"></i>
          </div>
          <h3>100% Verified Seller</h3>
          <p>A Verified Seller is a seller who has been proven authentic and reliable through a verification process. It provides confidence to buyers and reduces fraud.</p>
        </div>
        <div className="col">
          <div className="icon">
            <i className="bx bxs-user"></i>
          </div>
          <h3>24/7 Customer Support</h3>
          <p>24/7 Customer Support is round-the-clock assistance for customers via various channels to improve experience and resolve issues quickly.</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
