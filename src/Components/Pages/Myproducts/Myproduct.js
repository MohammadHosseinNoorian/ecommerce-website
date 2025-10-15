import style from "./Myproducts.module.css";
import { GrSubtractCircle } from "react-icons/gr";
import { FiPlusCircle } from "react-icons/fi";
import { useShop } from "../../Contexts/ProductContext";
import { memo, useContext } from "react";
import { usercontext } from "../../App/App";
const Myproduct = ({ book }) => {
  const { changeShoppingCart } = useShop();
  const { user } = useContext(usercontext);
  return (
    <>
      <img src={book.img} alt={book.name} />
      <div className={style.info}>
        <h3>{book.name}</h3>
        <div className={style.info_objects}>
          <p>نویسنده :</p>
          <p>{book.author}</p>
        </div>
        <div className={style.info_objects}>
          <p>کشور :</p>
          <p>{book.country}</p>
        </div>
        <div className={style.info_objects}>
          <p>قیمت :</p>
          <p>{book.prise} تومان</p>
        </div>
        <div className={style.info_objects}>
          <p>تعداد صفحه :</p>
          <p>{book.pages}</p>
        </div>
        <div className={style.info_objects}>
          <p>تعداد :</p>
          <div className={style.number}>
            <FiPlusCircle
              onClick={() => {
                user
                  ? changeShoppingCart(book, "add")
                  : alert("you should log in!");
              }}
            />
            <p>{book.number}</p>
            <GrSubtractCircle
              onClick={() => {
                user
                  ? changeShoppingCart(book, "subtract")
                  : alert("you should log in!");
              }}
            />
          </div>
        </div>
        <p className={style.summary}>{book.summary}</p>
      </div>
    </>
  );
};

export default memo(Myproduct);
