import { memo, useCallback, useEffect, useRef, useState } from "react";
import style from "./Home.module.css";
import Slide from "./Slide";
const Slider = () => {
  let slider = useRef(null);
  let [slides, setslides] = useState([1]);
  let [width, setwidth] = useState(0);
  let [fr, setfr] = useState("");
  let [IsDragging, setIsDragging] = useState(false);
  let [start, setstart] = useState(0);
  let [mouseup, setmouseup] = useState(true);
  let startinterval = useRef(null);

  let getslides = useCallback(async () => {
    try {
      let data = await fetch("https://myapp-api.onrender.com/slides");
      let res = await data.json();
      setslides(res);
      setwidth(res.length * 100);
      let _fr = "";
      for (let i = 0; i < res.length; i++) {
        _fr += " 1fr";
      }
      setfr(_fr);
    } catch (error) {
      console.log(error);
    }
  }, []);
  let handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setstart(e.clientX);
    setmouseup(false);
  }, []);
  let nextslide = useCallback(async () => {
    if (slider) {
      clearInterval(startinterval.current);
      slider.current.style.transition = "all 500ms ease-in-out";
      slider.current.style.transform = `translateX(-${10000 / width}%)`;
      setTimeout(() => {
        slider.current.style.transition = "none";
        slider.current.appendChild(slider.current.firstChild);
        slider.current.style.transform = "translateX(0px)";
      }, 500);
      setIsDragging(false);
      autoSlideChange();
    }
  }, [width, slider]);
  let prewslide = useCallback(async () => {
    if (slider) {
      clearInterval(startinterval.current);
      slider.current.style.transition = "all 500ms ease-in-out";
      slider.current.style.transform = `translateX(${10000 / width}%)`;
      setTimeout(() => {
        slider.current.style.transition = "none";
        slider.current.insertBefore(
          slider.current.lastChild,
          slider.current.firstChild
        );
        slider.current.style.transform = "translateX(0px)";
      }, 500);
      setIsDragging(false);
      autoSlideChange();
    }
  }, [width, slider]);
  let autoSlideChange = useCallback(() => {
    startinterval.current = setInterval(() => {
      if (!IsDragging) {
        nextslide();
      }
    }, 7000);
  }, [IsDragging, nextslide]);
  let handleMouseMove = useCallback(
    async (e) => {
      if (IsDragging && slider) {
        let drag = start - e;
        if (drag > 0) {
          slider.current.style.transform = `translateX(-${drag}px)`;
          if (drag > 500) {
            nextslide();
          } else if (mouseup) {
            handleMouseUp();
          }
        } else {
          slider.current.style.transform = `translateX(${-1 * drag}px)`;
          if (drag < -500) {
            prewslide();
          } else if (mouseup) {
            handleMouseUp();
          }
        }
      }
    },
    [slider, IsDragging, start, mouseup, prewslide, nextslide]
  );
  let handleMouseUp = useCallback(() => {
    if (slider) {
      slider.current.style.transform = "translateX(0px)";
      setIsDragging(false);
    }
  }, [slider]);
  useEffect(() => {
    getslides();
    autoSlideChange();
    return () => clearInterval(startinterval.current);
  }, [autoSlideChange]);
  return (
    <div className={style.container}>
      <div
        onMouseDown={(e) => {
          handleMouseDown(e);
        }}
        onMouseUp={() => {
          setmouseup(true);
        }}
        onMouseMove={(e) => {
          handleMouseMove(e.clientX);
        }}
        ref={slider}
        className={style.slider}
        style={{
          width: `${width}%`,
          gridTemplateColumns: fr,
        }}
      >
        {slides &&
          slides.map((elem, index) => {
            return (
              <div key={index} className={style.slides}>
                <Slide src={elem.img} alt={elem.alt} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(Slider);
