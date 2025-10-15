import style from "./Favorites.module.css";
import { FaHeart } from "react-icons/fa";
import { useFavorite } from "../../Contexts/ProductContext";
import { memo, useContext } from "react";
import { usercontext } from "../../App/App";

const Favorite = ({ book }) => {
  const { togglefavorite } = useFavorite();
  const { user } = useContext(usercontext);
  return (
    <>
      <img src={book.img} alt={book.name} />
      <div className={style.info}>
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
          <p>قیمت :</p>
          <p>{book.prise} تومان</p>
        </div>
        <div>
          <p>تعداد صفحه :</p>
          <p>{book.pages}</p>
        </div>
        <p className={style.summary}>{book.summary}</p>
      </div>
      <div className={style.heart}>
        <FaHeart
          onClick={() => {
            user ? togglefavorite(book) : alert("you should log in!");
          }}
          style={{
            color: "red",
            position: "absolute",
            top: "20px",
            left: "20px",
            fontSize: "50px",
          }}
        />
      </div>
    </>
  );
};

export default memo(Favorite);
