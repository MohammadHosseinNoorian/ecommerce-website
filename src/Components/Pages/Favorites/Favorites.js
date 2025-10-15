import { memo, useContext } from "react";
import { usercontext } from "../../App/App";
import style from "./Favorites.module.css";
import Favorite from "./Favorite";
import { FavoriteProvider } from "../../Contexts/ProductContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  let { user } = useContext(usercontext);
  if (user) {
    return (
      <>
        <h1>
          <Link title="home" className={style.link} to={"/"}>
            محصولات
          </Link>
        </h1>
        <div className={style.favorites}>
          {user.favorites.map((elem, index) => {
            return (
              <section className={style.myfavorite} dir="rtl" key={index}>
                <Favorite book={elem} />
              </section>
            );
          })}
        </div>
      </>
    );
  }
};

export default memo(Favorites);
