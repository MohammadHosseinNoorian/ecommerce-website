import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { GrSubtractCircle } from "react-icons/gr";
import { FiPlusCircle } from "react-icons/fi";
import style from "./Country.module.css";
import { useFavorite, useShop } from "../../Contexts/ProductContext";
import { usercontext } from "../../App/App";
import { memo, useContext } from "react";

const Books = ({ book }) => {
  const { user } = useContext(usercontext);
  const { changeShoppingCart, isAdded } = useShop();
  const { togglefavorite, isFavorite } = useFavorite();
  return (
    <>
      <Link to={book.link} className={style.product}>
        <img src={book.img} alt="" />
        <div dir="rtl" className={style.product_info}>
          <h3>{book.name}</h3>
          <div className={style.info}>
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
          <p className={style.sum}>{book.summary}</p>
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
              cursor: "pointer",
            }}
          />
        </div>
        <div className={style.add_delete}>
          <FiPlusCircle
            style={{ cursor: "pointer" }}
            onClick={() => {
              user
                ? changeShoppingCart(book, "add")
                : alert("you should log in!");
            }}
          />
          <p>{isAdded(book)}</p>
          <GrSubtractCircle
            style={{ cursor: "pointer" }}
            onClick={() => {
              user
                ? changeShoppingCart(book, "subtract")
                : alert("you should log in!");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default memo(Books);
