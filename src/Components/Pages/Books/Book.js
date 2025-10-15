import { FaHeart } from "react-icons/fa";
import style from "./Book.module.css";
import { memo, useContext, useMemo } from "react";
import { usercontext } from "../../App/App";
import { useFavorite, useShop } from "../../Contexts/ProductContext";
import { GrSubtractCircle } from "react-icons/gr";
import { FiPlusCircle } from "react-icons/fi";
const Book = ({ book }) => {
  const { user } = useContext(usercontext);
  const { togglefavorite, isFavorite } = useFavorite();
  const { changeShoppingCart, isAdded } = useShop();
  return (
    <section dir="rtl" className={style.book}>
      <div className={style.imgbook}>
        <img className={style.img} src={book.img} alt={book.name} />
        <div className={style.actions}>
          <FaHeart
            onClick={() => {
              user ? togglefavorite(book) : alert("you should log in!");
            }}
            style={{ color: isFavorite(book) ? "red" : "white" }}
          />
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
      </div>
      <div className={style.information}>
        <h1>{book.name}</h1>
        <div>
          <p>
            <span className={style.info}>نویسنده :</span>
            <span className={style.answer}>{book.author}</span>
          </p>
          <p>
            <span className={style.info}>کشور :</span>
            <span className={style.answer}>{book.country}</span>
          </p>
          <p>
            <span className={style.info}>تعداد صفحات :</span>
            <span className={style.answer}>{book.pages}</span>
          </p>
          <p>
            <span className={style.info}>قیمت :</span>
            <span className={style.answer}>{book.prise}</span>
          </p>
        </div>
        <p className={style.story}>{book.summary}</p>
      </div>
    </section>
  );
};

export default memo(Book);
