import { memo, useContext } from "react";
import { usercontext } from "../../App/App";
import style from "./Myproducts.module.css";
import Myproduct from "./Myproduct";
import { ShopProvider } from "../../Contexts/ProductContext";
import { Link } from "react-router-dom";

const Myproducts = () => {
  let { user } = useContext(usercontext);
  if (user) {
    return (
      <>
        <h1>
          <Link title="home" className={style.link} to={"/"}>
            محصولات
          </Link>
        </h1>
        <div className={style.myproducts}>
          {user.products.map((elem, index) => {
            return (
              <section className={style.myproduct} dir="rtl" key={index}>
                <Myproduct book={elem} />
              </section>
            );
          })}
        </div>
      </>
    );
  }
};

export default memo(Myproducts);
