import React, { memo, useCallback, useContext } from "react";
import { usercontext } from "../../App/App";
import style from "./Account.module.css";
import Infof from "./Infof";
import Infop from "./Infop";
import axios from "axios";
const Information = () => {
  let { user, setuser } = useContext(usercontext);
  const logout = () => {
    setuser(null);
  };
  let uploadimg = useCallback(
    async (image) => {
      if (user) {
        await axios.put(`http://localhost:3001/users/${user.id}`, {
          ...user,
          img: URL.createObjectURL(image),
        });
        setuser({ ...user, img: URL.createObjectURL(image) });
      }
    },
    [user]
  );
  if (user) {
    return (
      <>
        <div className={style.select_img}>
          {user && user.img ? <img src={user.img} alt={user.username} /> : ""}
          <input
            onChange={(e) => {
              uploadimg(e.target.files[0]);
            }}
            name="img"
            type="file"
            accept="image/*"
          />
        </div>
        <p className={style.name}>Hi {user.firstname}</p>
        <div>
          <Infof />
        </div>

        <div>
          <Infop />
        </div>
        <button className={style.logout} onClick={logout}>
          Log Out
        </button>
      </>
    );
  } else return "";
};

export default memo(Information);
