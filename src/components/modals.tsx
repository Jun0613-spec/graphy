"use client";

import React, { useState, useEffect } from "react";

import SubscriptionModal from "./subscription/subscription-modal";
import FailModal from "./subscription/fail-modal";
import { SuccessModal } from "./subscription/success-modal";

const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <FailModal />
      <SuccessModal />
      <SubscriptionModal />
    </>
  );
};

export default Modals;
