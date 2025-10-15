import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import style from "./Account.module.css";
import { memo, useCallback, useContext } from "react";
import { usercontext } from "../../App/App";

const Shop = () => {
  let { myproducts } = useContext(usercontext);
  let { user } = useContext(usercontext);
  let LogInAlert = useCallback(() => {
    alert("you should log in first!");
  }, []);
  if (user) {
    return (
      <Link title="Myproducts" className={style.shop} to={"/Myproducts"}>
        <MdShoppingCart
          style={{
            color: "white",
            width: "25px",
            height: "25px",
          }}
        />
        <p className={style.shopitem}>{myproducts}</p>
      </Link>
    );
  } else {
    return (
      <Link onClick={LogInAlert} title="Myproducts" className={style.shop}>
        <MdShoppingCart
          style={{
            color: "white",
            width: "25px",
            height: "25px",
          }}
        />
      </Link>
    );
  }
};

export default memo(Shop);
