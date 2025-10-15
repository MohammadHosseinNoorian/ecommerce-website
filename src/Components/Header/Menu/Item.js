import { Link } from "react-router-dom";
import style from "./Menu.module.css";
import Submenu from "./Submenu";
import { memo, useEffect, useRef, useState } from "react";
import { useList } from "../../Contexts/ProductContext";
const Item = ({ item, element, link }) => {
  let li = useRef();
  const { isMobile, isTablet } = useList();
  const [subMenuOn, setsubMenuOn] = useState(false);
  let showsubmenu = () => {
    if (li.current.children.length > 1) {
      li.current.children[1].classList.add(style.active);
    }
  };
  let dontshowsubmenu = () => {
    if (li.current.children.length > 1) {
      li.current.children[1].classList.remove(style.active);
    }
  };
  const togglesubmenu = () => {
    if (li.current.children.length === 0) return;
    if (subMenuOn) li.current.children[1].classList.remove(style.active);
    else li.current.children[1].classList.add(style.active);
    setsubMenuOn((prev) => !prev);
  };
  return (
    <li
      ref={li}
      onMouseEnter={togglesubmenu}
      onMouseLeave={togglesubmenu}
      className={style.items}
      onClick={isMobile || isTablet ? togglesubmenu : null}
    >
      {link ? <Link to={`${link}`}>{item}</Link> : <Link>{item}</Link>}
      {element.submenu ? <Submenu item={element.submenu} /> : ""}
    </li>
  );
};

export default memo(Item);
