"use client";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import { useState, useEffect } from "react";

const ModalProvider = () => {
  // 要使用到modal，需要防止水合错误
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return (
    <>
      <UploadModal />
      <AuthModal />
    </>
  );
};

export default ModalProvider;
