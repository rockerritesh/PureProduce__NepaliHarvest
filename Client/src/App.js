import React from "react";
import Blogs from "./Components/Blogs/Blogs";
import Collection from "./Components/Collection/Collection";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import Statistics from "./Components/Statistics/Statistics";

function App() {
  return (
    <>
    <header className="header">
    <Navbar/>
    <Hero/>
    </header>
    <Collection/>
    <Statistics/>
    <Blogs/>
    <Footer/>
    </>
  );
}

export default App;
