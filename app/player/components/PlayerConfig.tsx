"use client";

import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState(250); // 默认值

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerHeight >= 800) {
        setWidth(500);
      } else if (window.innerHeight >= 550) {
        setWidth(450);
      } else if (window.innerWidth >= 440) {
        setWidth(400);
      } else {
        setWidth(250);
      }
    };

    // 在组件挂载时计算初始宽度
    updateWidth();

    // 在窗口尺寸变化时更新宽度
    window.addEventListener("resize", updateWidth);

    // 在组件卸载时移除事件监听器
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return width;
};

export default useWindowWidth;
