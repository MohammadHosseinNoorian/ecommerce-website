import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sign from "../Pages/Sign/Sign";
import Home from "../Pages/Home/Home";
import Blog from "../Pages/Blog/Blog";
import Favorites from "../Pages/Favorites/Favorites";
import Myproducts from "../Pages/Myproducts/Myproducts";
import Footer from "../Footer/Footer";
import Book from "../Pages/Books/Book";
import Country from "../Pages/Countries/Country";
import {
  FavoriteProvider,
  ListStateProvider,
  ShopProvider,
} from "../Contexts/ProductContext";
export const usercontext = React.createContext();
export const myContext = React.createContext();
const App = () => {
  let [menu, setmenu] = useState([]);
  let [user, setuser] = useState(null);
  let [favorites, setfavorites] = useState(0);
  let [myproducts, setmyproducts] = useState(0);
  let [books, setbooks] = useState([]);
  let [countries, setcountries] = useState([]);
  let getproducts = useCallback(async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      let data = await res.json();
      setbooks(data);
    } catch (er) {
      console.error(er);
    }
  }, []);
  let getcountries = useCallback(async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/countries`);
      let data = await res.json();
      setcountries(data);
    } catch (er) {
      console.error(er);
    }
  }, []);
  useEffect(() => {
    getproducts();
    getcountries();
  }, []);
  return (
    <BrowserRouter>
      <usercontext.Provider
        value={{
          setmyproducts,
          setfavorites,
          favorites,
          myproducts,
          menu,
          user,
          setmenu,
          setuser,
        }}
      >
        <FavoriteProvider>
          <ShopProvider>
            <ListStateProvider>
              <Header />
            </ListStateProvider>
            <Routes>
              <Route path="/SignIn" element={<Sign />} />
              <Route path="/Favorites" element={<Favorites />} />
              <Route path="/Myproducts" element={<Myproducts />} />
              <Route path="/" element={<Home />} />
              {books.map((elem, index) => {
                return (
                  <Route
                    key={index}
                    path={elem.link}
                    element={<Book book={elem} />}
                  />
                );
              })}
              {countries.map((elem, index) => {
                return (
                  <Route
                    key={index}
                    path={elem.link}
                    element={<Country country={elem} />}
                  />
                );
              })}
              <Route path="/Blog" element={<Blog />} />
            </Routes>
            <Footer />
          </ShopProvider>
        </FavoriteProvider>
      </usercontext.Provider>
    </BrowserRouter>
  );
};

export default App;
