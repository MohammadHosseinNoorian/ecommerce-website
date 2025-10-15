import Subitem from "./Subitem";
import style from "./Menu.module.css";
import { memo } from "react";
const Submenu = ({ item }) => {
  return (
    <ul className={style.submenu}>
      {item.map((elem, index) => {
        return <Subitem key={index} element={elem} />;
      })}
    </ul>
  );
};

export default memo(Submenu);
