import { memo, useContext, useEffect } from "react";
import { usercontext } from "../../App/App";
import { Link } from "react-router-dom";
import style from "./Account.module.css";
import { FaHeart } from "react-icons/fa";

const Infof = () => {
  let { favorites } = useContext(usercontext);
  return (
    <>
      <div className={style.options}>
        <FaHeart
          style={{
            color: "red",
            width: "15px",
            height: "15px",
            marginRight: "5px",
          }}
        />
        <Link title="Favorites" to={"/Favorites"}>
          favorites
        </Link>
      </div>

      <p>{favorites}</p>
    </>
  );
};

export default memo(Infof);
