import React from 'react';
import "../Style/style.css"
import fruits from "../images/fruits.png"
import vegetables from "../images/vegetables.png"
import pesticides from "../images/pesticides.png"

const Blogs = () => {
  return (
    <section className="section blog">
      <div className="title">
        <span>BLOGS</span>
        <h2>Latest News</h2>
      </div>
      <div className="row container">
        <div className="col">
          <center><div className="top">
            <img src={vegetables} alt="" />
          </div></center>
          <div className="bottom">
            <h3>Trending</h3>
            <h4>
            <b>"The Power of Cruciferous Vegetables"</b> explores the cancer-fighting properties of broccoli, cauliflower, and Brussels sprouts.
            </h4>
            <span>10 January 2021</span>
          </div>
        </div>
        <div className="col">
          <center><div className="top">
            <img src={fruits} alt="" />
          </div></center>
          <div className="bottom">
            <h3>Trending</h3>
            <h4>
            "Apples: A Classic Fruit with Surprising Health Benefits" covers the many benefits of this widely available and versatile fruit, such as aiding digestion and reducing the risk of chronic diseases.
            </h4>
            <span>10 January 2021</span>
          </div>
        </div>
        <div className="col">
          <center><div className="top">
            <img src={pesticides} alt="" />
          </div></center>
          <div className="bottom">
            <h3>Trending</h3>
            <h4>
            "The Risks of Pesticide Residue on Fruits and Vegetables" discusses the potential health hazards associated with consuming produce contaminated with pesticide residue.
            </h4>
            <span>10 January 2021</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
