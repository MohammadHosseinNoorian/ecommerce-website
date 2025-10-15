import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaCircleUser } from "react-icons/fa6";
import style from "./Account.module.css";
import { Link } from "react-router-dom";
import { usercontext } from "../../App/App";
import Information from "./Information";
import Shop from "./Shop";
import { useList } from "../../Contexts/ProductContext";

const Account = () => {
  const { user, setmyproducts, setfavorites } = useContext(usercontext);
  const { isMobile } = useList();
  const [infoOn, setinfoOn] = useState(false);
  let info = useRef();
  let showinfo = () => {
    info.current.classList.add(style.active);
    setinfoOn(true);
  };
  let dontshowinfo = () => {
    info.current.classList.remove(style.active);
    setinfoOn(false);
  };
  useEffect(() => {
    if (user) {
      setmyproducts(user.products.length);
      setfavorites(user.favorites.length);
    }
  }, [user]);
  return (
    <div className={style.headeroptions}>
      {user ? (
        <>
          <div
            onMouseEnter={showinfo}
            onMouseLeave={dontshowinfo}
            className={style.sign}
          >
            <p
              onClick={infoOn ? dontshowinfo : showinfo}
              style={{ color: "white", marginLeft: "0.4rem" }}
              title={user.username}
            >
              {user.username}
            </p>
            {!user.img ? (
              <FaCircleUser
                style={{ color: "white", width: "25px", height: "25px" }}
              />
            ) : (
              <img
                style={{
                  objectFit: "fill",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                }}
                src={user.img}
                alt={user.UserName}
              />
            )}
          </div>
          <div
            onMouseEnter={showinfo}
            onMouseLeave={dontshowinfo}
            ref={info}
            className={style.information}
          >
            <Information />
          </div>
        </>
      ) : (
        <div className={style.sign}>
          <Link title="Sign In" to={"/SignIn"}>
            Sign in
          </Link>
          <FaCircleUser
            style={{ color: "white", width: "25px", height: "25px" }}
          />
        </div>
      )}
      <Shop />
    </div>
  );
};

export default memo(Account);
