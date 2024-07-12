"use client";

import { useState, useEffect } from "react";

const useMouseHide = () => {
  const [isHidden, setIsHidden] = useState(false);
  let timer: any;

  const handleMouseMove = () => {
    clearTimeout(timer);
    setIsHidden(false);

    timer = setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  };

  useEffect(() => {
    if (!timer)
      timer = setTimeout(() => {
        setIsHidden(true);
      }, 3000);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return { isHidden, handleMouseMove };
};

export default useMouseHide;
