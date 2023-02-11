import React, { useState, useEffect } from "react";
import "../Style/style.css";
import product1 from "../images/cabbage.png"
import product2 from "../images/apple.png"
import product3 from "../images/spinsod.png"


import Swiper from "swiper";

const Collection = () => {
const [mySwiper, setMySwiper] = useState(null);
  const products = [
    {
      id: 1,
      title: "Cabbage",
      price: "50/kg",
      rating: 4,
      count:0,
      url: product1,
      category: "Vegetables",
    },
    {
      id: 2,
      title: "Apple",
      price: "150/kg",
      count:0,
      rating: 4,
      url: product2,
      category: "Fruits",
    },
    {
      id: 3,
      title: "Spinosad",
      price: 200,
      rating: 5,
      count:0,
      url: product3,
      category: "Pesticides",
    },
    {
      id: 4,
      title: "tractor",
      price: "1500/hour",
      rating: 4.5,
      count:0,
      url: product2,
      category: "Machinery",
    },
  ];
  useEffect(() => {
    setMySwiper(
      new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".custom-pagination",
          clickable: true,
        },
      })
    );

    return () => {
      if (mySwiper !== null) {
        mySwiper.destroy();
      }
    };
  }, // eslint-disable-next-line
  []);
  const [clicked, setClicked] = useState(false);
  const handleClick = (id) => {
    if(!clicked){
    setClicked(true);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="section collection">
      <div className="title">
        <span>NEW ARRIVAL</span>
        <h2>Our New Arrival</h2>
      </div>
      <div className="filters d-flex">
        <div data-filter="All" 
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => handleFilterClick("All")}>
          All
        </div>
        <div
          data-filter="Vegetables"
          className={selectedCategory === "Vegetables" ? "active" : ""}
          onClick={() => handleFilterClick("Vegetables")}
        >
          Vegetables
        </div>
        <div
          data-filter="Fruits"
          className={selectedCategory === "Fruits" ? "active" : ""}
          onClick={() => handleFilterClick("Fruits")}
        >
          Fruits
        </div>
        <div data-filter="Pesticides" 
        className={selectedCategory === "Pesticides" ? "active" : ""}
        onClick={() => handleFilterClick("Pesticides")}>
          Pesticides
        </div>
        <div data-filter="Machinery" 
        className={selectedCategory === "Machinery" ? "active" : ""}
        onClick={() => handleFilterClick("Machinery")}>
          Machinery
        </div>
      </div>

      <div className="products container">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {filteredProducts.map((product) => (
              <div className="swiper-slide">
                <div className="product">
                  <div className="top d-flex">
                    <img src={product.url} alt="" />
                    <div className="icon d-flex">
                      <i className="bx bxs-heart" onClick={() => handleClick(product.id)}>{product.count}</i>                   
                    </div>
                    
                  </div>
                  <div className="bottom">
                    <h4>{product.title}</h4>
                    <div className="d-flex">
                      <div className="price">NPR.{product.price}</div>
                      <div className="rating">
                        {Array(5)
                          .fill(0)
                          .map((_, index) =>
                            index < Math.floor(product.rating) ? (
                              <i key={index} className="bx bxs-star" />
                            ) : index < product.rating ? (
                              <i key={index} className="bx bxs-star-half" />
                            ) : (
                              <i key={index} className="bx bxs-star-empty" />
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          <div className="custom-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
