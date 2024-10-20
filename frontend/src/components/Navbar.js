// components/Navbar.js
import React, { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          <i className="fa-solid fa-bars"></i>
        </button>
        {isDropdownOpen && (
          <div id="myDropdown" className="dropdown-content">
            <a href="#instruction">Instruction</a>
            <a href="#contact">Contact</a>
          </div>
        )}
      </div>
      <ul className="navbar-list">
        <li>
          <a href="#home" className="navbar-link">
            Home
          </a>
        </li>
        <li>
          <a href="#explore" className="navbar-link">
            Explore
          </a>
        </li>
        <li>
          <a href="#top-seller" className="navbar-link">
            Top Seller
          </a>
        </li>
        <li>
          <a href="#collection" className="navbar-link">
            Collection
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
