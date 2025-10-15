import { memo } from "react";
import Products from "./Products";
import Slider from "./Slider";

const Home = () => {
  return (
    <>
      <Slider />
      <Products />
    </>
  );
};

export default memo(Home);
