import React from 'react'
import "../Style/style.css";
import Logo from '../images/Logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row container">
        <div className="col">
          <div className="logo d-flex">
            <img src={Logo} style={{height:"40px",width:"40px"}} alt="logo" />&nbsp;<b>Nepali</b>&nbsp;Harvest
          </div>
          <p>
            We are also<br />
            <b>Available</b> On.
          </p>
          <div className="icons d-flex">
            <div className="icon d-flex">
              <a target="_blank" rel="noreferrer" href='https://www.facebook.com/adhikariraju7980'><i className="bx bxl-facebook"></i></a>
            </div>
            <div className="icon d-flex"><a target="_blank" rel="noreferrer" href='https://twitter.com/notrajuyadav39'><i className="bx bxl-twitter"></i></a></div>
            <div className="icon d-flex"><a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/raju-kumar-yadav-284814220/'><i className="bx bxl-linkedin"></i></a></div>
            <div className="icon d-flex"><a target="_blank" rel="noreferrer" href='https://github.com/adhikariraju38'><i className="bx bxl-github"></i></a></div>
          </div>
          <p className="color">
            Copyrights&copy; 2023 <br />
            NepaliHarvest
          </p>
        </div>
        <div className="col">
          <div>
            <h4>Category</h4>
            <a href="/">Vegetables</a>
            <a href="/">Fruits</a>
            <a href="/">Pesticides</a>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div className="d-flex">
              <div className="icon"><i className="bx bxs-map"></i></div>
              <span> Pulchowk Campus, Lalitpur, Nepal</span>
            </div>
            <div className="d-flex">
              <div className="icon"><i className="bx bxs-envelope"></i></div>
              <span>NepaliHarvest@nepaliharvest.com</span>
            </div>
            <div className="d-flex">
              <div className="icon"><i className="bx bxs-phone"></i></div>
              <span>+977 0043 789 900</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
