import React, { useRef, useState } from "react";
import classes from "./ShopItem.module.css";
function ShopItem({
  name,
  imageUrl,
  price,
  myCartVisitToAdd,
  addCartItem,
  id,
}) {
  const [count, setCount] = useState(1);
  let priceValue = useRef(price.current.value);
  const [value, setValue] = useState(price.current.value);
  function counter() {
    setCount((prevCount) => prevCount + 1);
    setValue(value + priceValue.current);
  }
  function decCount() {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    setValue((prevCount) =>
      prevCount > 0 ? prevCount - priceValue.current : prevCount
    );
  }

  function myModal(toggle) {
    myCartVisitToAdd(toggle);
  }
  function addCartArray(itemName, itemImage, itemPrice, itemId) {
    addCartItem(itemName, itemImage, itemPrice, itemId);
  }
  return (
    <div className={classes.shop_item}>
      <img
        src={`https:${imageUrl}`}
        alt="image"
        srcset=""
        className={classes.item_image}
      />
      <p>{name}</p>
      <p>{price.current.text}</p>
      <button
        onClick={() => {
          counter();
          myModal(true);
          addCartArray(name, imageUrl, price.current.value, id);
        }}
      >
        +
      </button>
      <span>
        Count:{count} Total: ${value}
      </span>
      <button
        onClick={() => {
          decCount();
        }}
      >
        -
      </button>
      <br />
      <button
        onClick={() => {
          myModal(true);

          addCartArray(name, imageUrl, price.current.value, id);
        }}
      >
        Add Cart
      </button>
    </div>
  );
}

export default ShopItem;
