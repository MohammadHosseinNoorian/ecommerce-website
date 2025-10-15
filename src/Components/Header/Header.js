import { memo, useRef, useState } from "react";
import Account from "./Account/Account";
import style from "./Header.module.css";
import Menu from "./Menu/Menu";
import { FaListUl } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useList } from "../Contexts/ProductContext";
const Header = () => {
  const { setliststate, liststate } = useList();
  const toggleListState = () => {
    setliststate((prev) => (prev ? false : true));
  };
  return (
    <header className={style.header}>
      <button
        onClick={() => {
          toggleListState();
        }}
        className={style.listtoggle}
      >
        {liststate ? (
          <FaRegCircleXmark
            style={{ color: "white", width: "100%", height: "100%" }}
          />
        ) : (
          <FaListUl style={{ color: "white", width: "100%", height: "100%" }} />
        )}
      </button>
      <Menu />
      <div className={style.logo}>
        <img
          src="https://img.freepik.com/premium-vector/open-book-logo-vector-illustrations_686597-9826.jpg?w=2000"
          alt="logo"
        />
      </div>
      <Account />
    </header>
  );
};

export default memo(Header);
