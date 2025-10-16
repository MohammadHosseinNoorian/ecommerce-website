import { memo, useContext, useEffect, useRef } from "react";
import { usercontext } from "../../App/App";
import Item from "./Item";
import style from "./Menu.module.css";
import { useList } from "../../Contexts/ProductContext";

const Menu = () => {
  let { setmenu } = useContext(usercontext);
  const { menu } = useContext(usercontext);
  const { setlist } = useList();
  const list = useRef(null);
  let getmenu = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_API_URL}/menu`);
      let res = await data.json();
      setmenu(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getmenu();
  }, []);
  useEffect(() => {
    setlist(list);
  }, []);
  return (
    <ul ref={list} className={style.Menu}>
      {menu.map((elem, index) => {
        return (
          <Item key={index} link={elem.link} item={elem.name} element={elem} />
        );
      })}
    </ul>
  );
};

export default memo(Menu);
