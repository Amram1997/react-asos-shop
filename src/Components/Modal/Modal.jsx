import React, { useEffect, useState } from "react";
import classes from "./Modal.module.css";
function Modal({ product, deleteInCart }) {
  function deleteItemInCart(eId) {
    deleteInCart(eId);
  }
  return (
    <div className={classes.modal_div}>
      <div className={classes.cart_header}>
        Cart
        <p>Total price: $1500</p>
        {product.length > 0 ? (
          product.map(({ name, image, price, id }, index) => {
            return (
              <div className={classes.item_div} key={index}>
                <img src={`https:${image}`} className={classes.cart_image} />
                <p>{name.substring(0, 30)}</p>
                <p>Price: ${price}</p>
                <button
                  onClick={() => {
                    deleteItemInCart(id);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })
        ) : (
          <span>loading</span>
        )}
        <button>All delete</button>
      </div>
    </div>
  );
}

export default Modal;
