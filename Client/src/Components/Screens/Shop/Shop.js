import React, { useState } from "react";
import "../../Style/style.css";
import "./shop.css";
import product1 from "../../images/cabbage.png";
import product2 from "../../images/apple.png";
import product3 from "../../images/spinsod.png";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import ShopItem from "./ShopItem";

const Shop = () => {
  const products = [
    {
      id: 1,
      title: "Cabbage",
      price: "50/kg",
      rating: 4,
      count: 0,
      url: product1,
      category: "Vegetables",
    },
    {
      id: 2,
      title: "Apple",
      price: "150/kg",
      count: 0,
      rating: 4,
      url: product2,
      category: "Fruits",
    },
    {
      id: 3,
      title: "Spinosad",
      price: 200,
      rating: 5,
      count: 0,
      url: product3,
      category: "Pesticides",
    },
    {
      id: 4,
      title: "tractor",
      price: "1500/hour",
      rating: 4.5,
      count: 0,
      url: product2,
      category: "Machinery",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    setSearchResults(
      products.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <div className="container2">
        <div className="row2">
          <div className="col-md-2 collection section">
            <div className="title">
              <span style={{ marginRight: "4rem" }}>Categories</span>
            </div>
            <div className="filters">
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="All"
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => handleFilterClick("All")}
              >
                All
              </div>
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="Vegetables"
                className={selectedCategory === "Vegetables" ? "active" : ""}
                onClick={() => handleFilterClick("Vegetables")}
              >
                Vegetables
              </div>
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="Fruits"
                className={selectedCategory === "Fruits" ? "active" : ""}
                onClick={() => handleFilterClick("Fruits")}
              >
                Fruits
              </div>
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="Pesticides"
                className={selectedCategory === "Pesticides" ? "active" : ""}
                onClick={() => handleFilterClick("Pesticides")}
              >
                Pesticides
              </div>
              <div
                style={{ marginBottom: "1rem", marginRight: "4rem" }}
                data-filter="Machinery"
                className={selectedCategory === "Machinery" ? "active" : ""}
                onClick={() => handleFilterClick("Machinery")}
              >
                Machinery
              </div>
            </div>
          </div>
          <div className="col-md-8 section">
            <div className="title">
              <span>All Products</span>
            </div>
            <div className="row2">
              <div className="container3 mx-1">
                {products.length === 0 && "No products to display"}
              </div>

              {searchTerm === ""
                ? filteredProducts.map((item) => {
                    return <ShopItem key={item.id} item={item} />;
                  })
                : searchResults.map((item) => {
                    return <ShopItem key={item.id} item={item} />;
                  })}
            </div>
          </div>
          <div className="col-md-2 collection section">
            <div className="title">
              <span style={{marginRight:"2rem"}} >Search Your Item</span>
            </div>
            <div className="input-field1">
              <i className="bx bxs-search"></i>
              <input
                type="text"
                placeholder="Search"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="title" >
              <span style={{marginTop:"4rem"}}>Mostly Visited Categories</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
