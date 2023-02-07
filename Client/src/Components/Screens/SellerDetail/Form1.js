import React, { useState } from "react";
import "./Seller.css";

function Form1() {
  const [sellerImage, setSellerImage] = useState(null);
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerIdPic, setSellerIdPic] = useState(null);
  const [sellerIdNumber, setSellerIdNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your form submit action here
  };

  return (
    <form onSubmit={handleSubmit} className="form2 sign-up-form1">
      <h1 className="title1">Become a Farmer</h1>
      <label
        htmlFor="seller-image"
        style={{
          fontSize: "20px",
          marginBottom: "10px",
          display: "block",
        }}
      >
        Upload Your Image:
      </label>

      <div className="input-field1">
        <i className="bx bxs-image"></i>
        <input
          type="file"
          placeholder="upload your image"
          id="seller-image"
          name="seller-image"
          onChange={(event) => setSellerImage(event.target.files[0])}
        />
      </div>
      <label htmlFor="seller-image" style={{
          fontSize: "20px",
          marginBottom: "10px",
          display: "block",
        }}>Your Phone Number: </label>
      <div className="input-field1">
        <i className="bx bxs-phone"></i>

        <input
          type="text"
          id="seller-phone"
          placeholder="+977"
          name="seller-phone"
          value={sellerPhone}
          onChange={(event) => setSellerPhone(event.target.value)}
        />
      </div>
      <label htmlFor="seller-image" style={{
          fontSize: "20px",
          marginBottom: "10px",
          display: "block",
        }}>Upload Your ID Image:</label>
      <div className="input-field1">
        <i className="bx bxs-id-card"></i>

        <input
          type="file"
          placeholder="Your Id Pic"
          id="seller-id-pic"
          name="seller-id-pic"
          onChange={(event) => setSellerIdPic(event.target.files[0])}
        />
      </div>
      <label htmlFor="seller-image" style={{
          fontSize: "20px",
          marginBottom: "10px",
          display: "block",
        }}>Upload Your Id Number:</label>
      <div className="input-field1">
        <i className="bx bxs-data"></i>

        <input
          type="text"
          placeholder="Id Number"
          id="seller-id-number"
          name="seller-id-number"
          value={sellerIdNumber}
          onChange={(event) => setSellerIdNumber(event.target.value)}
        />
      </div>
      <input type="submit" className="btn1" value="Submit" />
    </form>
  );
}

export default Form1;
