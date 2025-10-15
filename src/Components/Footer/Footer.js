import { IoBook } from "react-icons/io5";
import style from "./Footer.module.css";
import { BsInstagram } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { memo } from "react";
const Footer = () => {
  return (
    <footer id="footer" className={style.footer}>
      <div className={style.explain}>
        <IoBook
          style={{
            width: "15px",
            height: "15px",
            color: "yellow",
          }}
        />
        <p>
          Reading books broadens our horizons, deepens our empathy, and fuels
          our imagination by transporting us to different worlds and
          perspectives.
        </p>
        <IoBook
          style={{
            width: "15px",
            height: "15px",
            color: "yellow",
          }}
        />
      </div>
      <div className={style.contact}>
        <p>
          Address:<span>123 Main St, Anytown, USA</span>
        </p>
        <p>
          Phone:<span>555-123-4567</span>
        </p>
        <div>
          <Link>
            <BsInstagram
              title="Instagram"
              style={{
                width: "25px",
                height: "25px",
                color: "#C13584",
              }}
            />
          </Link>
          <Link>
            <FaTelegram
              title="Telegram"
              style={{
                width: "25px",
                height: "25px",
                color: "#27A7E7",
              }}
            />
          </Link>
          <p style={{ color: "white" }}>
            <Link
              title="BookWorld.com"
              style={{ color: "#27A7E7" }}
              to={"/Home"}
            >
              BookWorld.com
            </Link>
            2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
