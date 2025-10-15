import Books from "./Books";
import style from "./Country.module.css";
import { FavoriteProvider, ShopProvider } from "../../Contexts/ProductContext";
import { memo } from "react";
const Country = ({ country }) => {
  return (
    <>
      <img className={style.flag} src={country.flag} alt={country.name} />
      <div className={style.books}>
        {country.books.map((elem, index) => {
          return (
            <section className={style.book} dir="rtl" key={index}>
              <Books book={elem} />
            </section>
          );
        })}
      </div>
    </>
  );
};

export default memo(Country);
