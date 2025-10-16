import { memo, useCallback, useEffect, useState } from "react";
import style from "./Home.module.css";
import Product from "./Product";
import { GrPrevious, GrNext } from "react-icons/gr";
const Products = () => {
  let [books, setbooks] = useState([]);
  let [pagepattern, setpagepattern] = useState([]);
  let [currentpage, setcurrentpage] = useState(1);
  let [totalpages, settotalpages] = useState(0);
  let [rdis, setrdis] = useState(false);
  let [ldis, setldis] = useState(true);
  let [user] = useState(null);
  let getproducts = useCallback(async () => {
    try {
      let res = await fetch("http://localhost:3001/products");
      let data = await res.json();
      settotalpages(
        data.length % 6 === 0
          ? data.length / 6
          : Math.floor(data.length / 6) + 1
      );
      setbooks(data.slice((currentpage - 1) * 6, (currentpage - 1) * 6 + 6));
    } catch (er) {
      console.error(er);
    }
  }, [currentpage]);
  let pages = useCallback(() => {
    if (totalpages > 10) {
      if (currentpage <= 3 || currentpage >= totalpages - 2) {
        setpagepattern([
          1,
          2,
          3,
          "...",
          totalpages - 2,
          totalpages - 1,
          totalpages,
        ]);
      } else {
        setpagepattern([1, "...", currentpage, "...", totalpages]);
      }
    } else {
      setpagepattern(
        Array.from({ length: totalpages }, (_, index) => index + 1)
      );
    }
  }, [totalpages, currentpage]);
  let changepage = useCallback(
    (e) => {
      if (Number(e)) {
        setcurrentpage(Number(e));
      }
    },
    [currentpage]
  );
  useEffect(() => {
    getproducts();
    pages();
  }, [getproducts, pages]);
  useEffect(() => {
    setrdis(currentpage === totalpages ? true : false);
    setldis(currentpage === 1 ? true : false);
  }, [currentpage, totalpages]);
  return (
    <div className={style.products}>
      <div className={style.search}></div>
      {books.map((elem) => {
        return (
          <section key={elem.id}>
            <Product book={elem} />
          </section>
        );
      })}
      <div className={style.pages}>
        <button
          onClick={() => {
            if (ldis) return;
            setcurrentpage(currentpage - 1);
          }}
          className={style.page}
          disabled={ldis}
        >
          <GrPrevious />
        </button>
        {pagepattern.map((elem, index) => {
          return (
            <button
              key={index}
              onClick={(e) => {
                changepage(e.target.innerText);
              }}
              className={style.page}
              style={
                currentpage === elem
                  ? { backgroundColor: "#311b925f", cursor: "not-allowed" }
                  : {}
              }
            >
              {elem}
            </button>
          );
        })}
        <button
          onClick={() => {
            if (rdis) return;
            setcurrentpage(currentpage + 1);
          }}
          className={style.page}
          disabled={rdis}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default memo(Products);
