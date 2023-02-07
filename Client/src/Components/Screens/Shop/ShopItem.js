import React, { useState } from "react";
import "../../Style/style.css";

const ShopItem = (props) => {
  const [quantity, setQuanity] = useState(1);
  const [clicked,setClicked]=useState(false)
  const { item } = props;
  const [count, setCount] = useState(0);
  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      setCount(count+1)
    }
    
  };

  const handleAddClick = () => {
    setQuanity(quantity + 1);
  };

  const handleSubClick = () => {
    if (quantity > 1) {
      setQuanity(quantity - 1);
    }
  };

  return (
    <>
      <div className="collection">
        <div
          className="products"
          style={{
            width: "26rem",
            marginRight: "40px",
            marginLeft: "20px",
            marginBottom: "5rem",
          }}
        >
          <div className="product">
            <div className="top d-flex" style={{ height: "25rem" }}>
              <img src={item.url} style={{ height: "20rem" }} alt="alt" />
              <div className="icon d-flex">
                <i onClick={handleClick} className="bx bxs-heart">{count}</i>
              </div>
            </div>
            <div className="bottom">
              <h4>{item.title}</h4>

              <div className="d-flex">
                <div className="price">Rate: {item.price}</div>
                <div className="rating">
                  {Array(5)
                    .fill(0)
                    .map((_, index) =>
                      index < Math.floor(item.rating) ? (
                        <i key={index} className="bx bxs-star" />
                      ) : index < item.rating ? (
                        <i key={index} className="bx bxs-star-half" />
                      ) : (
                        <i key={index} className="bx bxs-star-empty" />
                      )
                    )}
                </div>
              </div>
              <div className="d-flex" style={{ marginTop: "1rem" }}>
                <div>
                  <h3>Quantity</h3>
                </div>
                <div>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={handleSubClick}
                    className="bx bxs-minus-circle"
                  />&nbsp; 
                  {quantity}&nbsp;
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={handleAddClick}
                    className="bx bxs-alarm-add"
                  />
                </div>
              </div>
              <div className="d-flex button" style={{ marginTop: "1rem" }}>
                <div>
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#013237",
                      color: "#eaf9e7",
                    }}
                    className="price"
                  >
                    Buy
                  </button>
                </div>
                <div>
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#013237",
                      color: "#eaf9e7",
                    }}
                    className="price"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopItem;
