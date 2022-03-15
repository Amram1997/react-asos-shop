import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import ShopSection from "./Components/ShopSection/ShopSection";
import ShopItem from "./Components/ShopItem/ShopItem";
import { useEffect, useState } from "react";
import Modal from "./Components/Modal/Modal";

function App() {
  const [data, setData] = useState([]);
  const [isvisibility, setIsvisibility] = useState(false);
  const [cartState, setCartState] = useState([]);
  const [name, setName] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("name");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    fetch(
      "https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "asos2.p.rapidapi.com",
          "x-rapidapi-key":
            "792685f0bemsh925d51cd0f912acp152746jsn11c09fa9bce4",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => setData(res.products));
  }, []);

  function filterByName(value) {
    setData(
      data.length > 0 ? data.filter((e) => e.price.current.value >= value) : ""
    );
    console.log(data);
  }

  function visitModal() {
    setIsvisibility(!isvisibility);
  }

  function visitModaltoAdd(toog) {
    setIsvisibility(toog);
  }
  function addCartItem(prodName, prodImage, prodPrice, id) {
    setCartState((prev) => {
      return [
        ...prev,
        { name: prodName, image: prodImage, price: prodPrice, id: id },
      ];
    });
  }
  function deleteInCart(eId) {
    let arr = cartState.filter((item) => {
      return item.id !== eId;
    });
    setCartState(arr);
  }
  useEffect(() => {
    localStorage.setItem("productsCart", JSON.stringify(cartState));
  }, [cartState]);
  console.log(cartState);
  return (
    <div className="App">
      <NavBar
        filterByName={filterByName}
        myCartVisit={visitModal}
        deleteInCart={deleteInCart}
      />
      {isvisibility && (
        <Modal product={cartState} deleteInCart={deleteInCart} />
      )}
      <ShopSection>
        {data.length > 0 ? (
          data.map(({ id, name, imageUrl, price }) => {
            return (
              <ShopItem
                key={id}
                name={name}
                imageUrl={imageUrl}
                price={price}
                id={id}
                myCartVisitToAdd={visitModaltoAdd}
                addCartItem={addCartItem}
              />
            );
          })
        ) : (
          <span>loading</span>
        )}
      </ShopSection>
    </div>
  );
}

export default App;
