import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./Sign.module.css";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../../App/App";

const Sign = () => {
  let [formlog, setformlog] = useState(style.active);
  let [formsign, setformsign] = useState(style.deactive);
  let [logusername, setlogusername] = useState("");
  let [logpassword, setlogpassword] = useState("");
  let [signusername, setsignusername] = useState("");
  let [signfname, setsignfname] = useState("");
  let [signlname, setsignlname] = useState("");
  let [signemail, setsignemail] = useState("");
  let [signpassword, setsignpassword] = useState("");
  let [massage, setmassage] = useState("");
  let { setuser } = useContext(usercontext);
  let logbtn = useRef();
  let signbtn = useRef();
  let refsignusername = useRef();
  let refsignfname = useRef();
  let refsignlname = useRef();
  let refsignemail = useRef();
  let refsignpassword = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      formlog === style.active &&
      logusername.length >= 1 &&
      logpassword.length >= 1
    ) {
      logbtn.current.disabled = false;
    } else {
      logbtn.current.disabled = true;
    }
  }, [formlog, logusername, logpassword]);
  useEffect(() => {
    if (
      formsign === style.active &&
      signusername.length >= 1 &&
      signemail.length >= 1 &&
      signfname.length >= 1 &&
      signlname.length >= 1 &&
      signpassword.length >= 1
    ) {
      signbtn.current.disabled = false;
    } else {
      signbtn.current.disabled = true;
    }
  }, [formsign, signusername, signfname, signlname, signemail, signpassword]);
  let adduser = useCallback(
    async (e) => {
      e.preventDefault();
      let user = {
        firstname: signfname,
        lastname: signlname,
        email: signemail,
        password: signpassword,
        username: signusername,
        img: "https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg",
        products: [],
        favorites: [],
      };
      try {
        let data = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(user),
        });
        await data.json();
        alert("your sign in is complete");
        tolog();
      } catch (error) {
        console.log(error);
      }
    },
    [signpassword, signemail, signlname, signfname, signusername]
  );
  let searchuser = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        let data = await fetch(`${process.env.REACT_APP_API_URL}/users`);
        let res = await data.json();
        let userFound = res.find(
          (elem) =>
            elem.username === logusername && elem.password === logpassword
        );
        if (userFound) {
          setuser(userFound);
          alert("welcome !");
          navigate("/");
        } else {
          setmassage("username or password is wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [logpassword, logusername]
  );
  let tosign = () => {
    setformsign(style.active);
    setformlog(style.deactive);
  };
  let tolog = () => {
    setformsign(style.deactive);
    setformlog(style.active);
    refsignfname.current.value = "";
    refsignlname.current.value = "";
    refsignemail.current.value = "";
    refsignusername.current.value = "";
    refsignpassword.current.value = "";
  };
  return (
    <div className={style.forms}>
      <form
        onSubmit={(e) => searchuser(e)}
        method="POST"
        encType="multipart/form-data"
      >
        <div className={formlog}></div>
        <label htmlFor="UserName">username</label>
        <input
          id="UserName"
          onChange={(e) => {
            setlogusername(e.target.value);
          }}
          placeholder="username .........."
          type="text"
          name="UserName"
          autoComplete="username"
          required
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          onChange={(e) => {
            setlogpassword(e.target.value);
          }}
          placeholder="password .........."
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        {massage ? (
          <p style={{ color: "red", margin: "5px 0" }}>{massage}</p>
        ) : (
          ""
        )}
        <p style={{ color: "white" }}>if you dont have an Account?</p>
        <p onClick={tosign} style={{ color: "red", cursor: "pointer" }}>
          click here
        </p>
        <button type="submit" ref={logbtn} disabled>
          Login
        </button>
      </form>
      <form
        onSubmit={(e) => adduser(e)}
        method="POST"
        encType="multipart/form-data"
      >
        <div className={formsign}></div>
        <label htmlFor="Name">first name</label>
        <input
          ref={refsignfname}
          id="Name"
          onChange={(e) => {
            setsignfname(e.target.value);
          }}
          placeholder="firstname .........."
          type="text"
          name="Name"
          required
        />
        <label htmlFor="Lname">last name</label>
        <input
          ref={refsignlname}
          id="Lname"
          onChange={(e) => {
            setsignlname(e.target.value);
          }}
          placeholder="lastname .........."
          type="text"
          name="Lname"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          ref={refsignemail}
          id="email"
          onChange={(e) => {
            setsignemail(e.target.value);
          }}
          placeholder="email .........."
          type="email"
          name="email"
          required
        />
        <label htmlFor="UserName1">username</label>
        <input
          ref={refsignusername}
          id="UserName1"
          onChange={(e) => {
            setsignusername(e.target.value);
          }}
          placeholder="username .........."
          type="text"
          name="UserName"
          autoComplete="username"
          required
        />
        <label htmlFor="password1">password</label>
        <input
          ref={refsignpassword}
          id="password1"
          onChange={(e) => {
            setsignpassword(e.target.value);
          }}
          placeholder="password .........."
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        <p style={{ color: "white" }}>if you already have an Account?</p>
        <p onClick={tolog} style={{ color: "red", cursor: "pointer" }}>
          click here
        </p>
        <button ref={signbtn} type="submit" disabled>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Sign;
