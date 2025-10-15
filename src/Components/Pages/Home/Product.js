import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GrSubtractCircle } from "react-icons/gr";
import { FiPlusCircle } from "react-icons/fi";
import style from "./Home.module.css";
import { memo, useContext, useEffect, useMemo } from "react";
import { usercontext } from "../../App/App";
import { Link } from "react-router-dom";
import { useShop, useFavorite } from "../../Contexts/ProductContext";

const Product = ({ book }) => {
  const { user } = useContext(usercontext);
  const { changeShoppingCart, isAdded } = useShop();
  const { togglefavorite, isFavorite } = useFavorite();

  return (
    <div className={style.product}>
      <Link to={book.link} className={style.link}>
        <img className={style.img} src={book.img} alt="" />
        <div dir="rtl" className={style.product_info}>
          <h3>{book.name}</h3>
          <div>
            <p>نویسنده :</p>
            <p>{book.author}</p>
          </div>
          <div>
            <p>کشور :</p>
            <p>{book.country}</p>
          </div>
          <div>
            <p>تعداد صفحات :</p>
            <p>{book.pages}</p>
          </div>
          <div>
            <p>قیمت :</p>
            <p>{book.prise} تومان</p>
          </div>
        </div>
      </Link>
      <div className={style.like_add}>
        <div className={style.like}>
          <FaHeart
            onClick={() => {
              user ? togglefavorite(book) : alert("you should log in!");
            }}
            style={{
              color: isFavorite(book) ? "red" : "white",
            }}
          />
        </div>
        <div className={style.add}>
          <div>
            <FaShoppingCart
              onClick={() => {
                user
                  ? changeShoppingCart(book, "toggle")
                  : alert("you should log in!");
              }}
              style={{
                color: isAdded(book) ? "black" : "white",
              }}
            />
            {isAdded(book) ? (
              <p className={style.nproducts}>{isAdded(book)}</p>
            ) : null}
          </div>
          <div className={style.add_delete}>
            <FiPlusCircle
              onClick={() => {
                user
                  ? changeShoppingCart(book, "add")
                  : alert("you should log in!");
              }}
            />
            <GrSubtractCircle
              onClick={() => {
                user
                  ? changeShoppingCart(book, "subtract")
                  : alert("you should log in!");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Product);
