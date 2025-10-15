import { memo, useContext, useEffect } from "react";
import { usercontext } from "../../App/App";
import { Link } from "react-router-dom";
import style from "./Account.module.css";
import { MdShoppingCart } from "react-icons/md";

const Infop = () => {
  let { myproducts } = useContext(usercontext);
  return (
    <>
      <div className={style.options}>
        <MdShoppingCart
          style={{
            width: "15px",
            height: "15px",
            marginRight: "5px",
          }}
        />
        <Link title="Myproducts" to={"/Myproducts"}>
          products
        </Link>
      </div>

      <p>{myproducts}</p>
    </>
  );
};

export default memo(Infop);
