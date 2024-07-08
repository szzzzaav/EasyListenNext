"use client";

import Modal from "@/hooks/Modal";
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
      <div className="w-10 h-10 bg-slate-50"></div>
      <Modal isOpen onChange={() => {}} title="Title" description="description">
        TestChildren
      </Modal>
    </>
  );
};

export default ModalProvider;
