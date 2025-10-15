import { memo } from "react";

const Slide = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

export default memo(Slide);
