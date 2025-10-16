import { memo, useContext, useEffect, useState } from "react";
import { usercontext } from "../../App/App";
import style from "./Account.module.css";
import Infof from "./Infof";
import Infop from "./Infop";
import axios from "axios";
const Information = () => {
  let { user, setuser } = useContext(usercontext);
  const [userImg, setuserImg] = useState(user.img);
  const logout = () => {
    setuser(null);
  };
  const handleInputImg = (img) => {
    setuserImg(URL.createObjectURL(img));
  };
  const putImg = async () => {
    await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
      ...user,
      img: userImg,
    });
    setuser({ ...user, img: userImg });
  };
  useEffect(() => {
    putImg();
  }, [userImg]);
  return (
    <>
      <div className={style.select_img}>
        {user && user.img ? <img src={user.img} alt={user.username} /> : ""}
        <input
          onChange={(e) => {
            handleInputImg(e.target.files[0]);
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
};

export default memo(Information);
