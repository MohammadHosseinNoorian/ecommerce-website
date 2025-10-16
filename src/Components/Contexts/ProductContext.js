import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usercontext } from "../App/App";
import axios from "axios";

const FavoriteContext = createContext();
const ShopContext = createContext();
const ListStateContext = createContext();

export function ListStateProvider({ children }) {
  const [liststate, setliststate] = useState(false);
  const [list, setlist] = useState(null);
  const [isMobile, setisMobile] = useState(false);
  const [isTablet, setisTablet] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setisMobile(width <= 768);
      setisTablet(width > 768 && width <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!(list === null)) {
      if (isMobile) {
        if (liststate) {
          list.current.style.transform = "translateX(140px)";
          list.current.style.opacity = "1";
        } else {
          list.current.style.transform = "translateX(0px)";
          list.current.style.opacity = "0";
        }
      } else {
        list.current.style.transform = "none";
        list.current.style.opacity = "1";
      }
    }
  }, [liststate, list, isMobile]);
  return (
    <ListStateContext.Provider
      value={{ setlist, setliststate, liststate, isMobile, isTablet }}
    >
      {children}
    </ListStateContext.Provider>
  );
}

export function FavoriteProvider({ children }) {
  const { user, setuser } = useContext(usercontext);
  const [Book, setBook] = useState({});
  const [toggle, settoggle] = useState(false);

  const isFavorite = useCallback(
    (book) => {
      return user?.favorites?.some((p) => p?.id === book.id);
    },
    [user?.favorites]
  );

  const togglefavorite = useCallback((book) => {
    setBook(book);
    settoggle(true);
  }, []);

  let Controlfavorite = async (Isfavorite) => {
    if (user) {
      let newFavorites;
      if (!Isfavorite) {
        newFavorites = [...user.favorites, Book];
      } else {
        newFavorites = user.favorites.filter((elem) => elem.id !== Book.id);
      }
      await axios.put(`https://myapp-api.onrender.com/users/${user.id}`, {
        ...user,
        favorites: newFavorites,
      });
      setuser({ ...user, favorites: newFavorites });
    }
  };

  useEffect(() => {
    if (toggle) {
      if (
        user?.favorites.length > 0 &&
        user.favorites.some((elem) => elem.id === Book.id)
      ) {
        Controlfavorite(true);
      } else {
        Controlfavorite(false);
      }
      settoggle(false);
    }
  }, [toggle]);

  return (
    <FavoriteContext.Provider value={{ isFavorite, togglefavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function ShopProvider({ children }) {
  let { user, setuser } = useContext(usercontext);
  const [Book, setBook] = useState({});
  const [Action, setAction] = useState(null);
  const [clicked, setclicked] = useState(false);

  const changer = async (action) => {
    if (!user) return;
    try {
      let newproducts;
      switch (action) {
        case "increment":
          newproducts = user.products?.map((p) => {
            if (p.id === Book.id) {
              return { ...p, number: p.number + 1 };
            } else return p;
          });
          break;
        case "first-increment":
          newproducts = [...user.products, { ...Book, number: 1 }];
          break;
        case "decrement":
          newproducts = user.products?.map((p) => {
            if (p.id === Book.id) {
              return { ...p, number: p.number - 1 };
            } else return p;
          });
          break;
        case "delete":
          newproducts = user.products?.filter((elem) => elem.id != Book.id);
          break;
        default:
          throw new Error(`Unknown action type: ${action}`);
      }
      await axios.put(`https://myapp-api.onrender.com/users/${user.id}`, {
        ...user,
        products: newproducts,
      });
      setuser({
        ...user,
        products: newproducts,
      });
    } catch (error) {
      console.error("failed:", error);
    }
  };

  const isAdded = useCallback(
    (book) => {
      let resault = user?.products?.find((p) => p.id === book.id);
      return resault ? resault.number : false;
    },
    [user?.products]
  );

  const ToggleProduct = () => {
    isAdded(Book) ? changer("delete") : changer("first-increment");
  };

  const addp = () => {
    isAdded(Book) ? changer("increment") : changer("first-increment");
  };

  const subtractp = () => {
    if (isAdded(Book)) {
      user.products.find((p) => p.id === Book.id).number > 1
        ? changer("decrement")
        : changer("delete");
    } else {
      alert("you don't have this product");
    }
  };

  const changeShoppingCart = useCallback(
    (book, change) => {
      setBook(book);
      setAction(change);
      setclicked(true);
    },
    [addp, ToggleProduct, subtractp]
  );

  useEffect(() => {
    if (!clicked) return;
    switch (Action) {
      case "add":
        addp();
        break;
      case "toggle":
        ToggleProduct();
        break;
      case "subtract":
        subtractp();
        break;
    }
    setclicked(false);
  }, [clicked]);

  return (
    <ShopContext.Provider
      value={{
        changeShoppingCart,
        isAdded,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useFavorite() {
  return useContext(FavoriteContext);
}

export function useShop() {
  return useContext(ShopContext);
}

export function useList() {
  return useContext(ListStateContext);
}
