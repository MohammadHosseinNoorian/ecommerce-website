import { Link } from "react-router-dom";
import style from "./Menu.module.css";
import { memo } from "react";
const Subitem = ({ element }) => {
  return (
    <li className={style.subitems}>
      <Link to={`/${element}`}>{element}</Link>
    </li>
  );
};

export default memo(Subitem);
