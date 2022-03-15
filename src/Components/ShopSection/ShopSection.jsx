import React from "react";
import classes from "./ShopSection.module.css";
function ShopSection({ children, ...props }) {
  return <div className={classes.shop_section}>{children}</div>;
}

export default ShopSection;
