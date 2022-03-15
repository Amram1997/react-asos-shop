import React, { useState } from "react";
import classes from "./NavBar.module.css";
import cartImage from "../images/cart.png";
function NavBar({ filterByName, myCartVisit }) {
  const [inputValue, setInputValue] = useState(0);
  const handleInputValue = (event) => {
    setInputValue(+event.target.value);
    filterByName(+event.target.value);
  };
  function myModal(toggle) {
    myCartVisit(!toggle);
  }
  return (
    <div className={classes.nav_menu}>
      <div>
        <ul className={classes.nav_ul}>
          <li className={classes.asos_logo}>Asos</li>
          <li>Shop</li>
          <li>about</li>
          <li>
            <select
              name=""
              id=""
              value={inputValue}
              onChange={(event) => handleInputValue(event)}
            >
              <option value={10}>Select by Price</option>
              <option value={100}> -$100</option>
              <option value={200}> - $200</option>
              <option value={300}>- $300</option>
            </select>
          </li>
          <li className={classes.cart} onClick={() => myModal(true)}>
            <img src={cartImage} />
            <span className={classes.cart_count}>0</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
