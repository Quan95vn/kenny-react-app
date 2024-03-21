import React, { useEffect } from "react";
import { Header, Footer } from "../components/layout";
import { Home, MenuItemDetails, NotFound } from "../pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../apis/shoppingCartApi";
import { setShoppingCart } from "../storage/redux/shoppingCartSlice";
import ShoppingCart from "../pages/ShoppingCart";

function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery(
    "b7ae37bf-09b1-4b47-9ce1-c963031d2920"
  );

  useEffect(() => {
    if (!isLoading) {
      console.log(data.response);

      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div className="text-success">
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>

          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
