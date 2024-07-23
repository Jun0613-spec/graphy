"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useFailModal } from "@/hooks/subscription/store/use-fail-modal";
import { useSuccessModal } from "@/hooks/subscription/store/use-success-modal";

const SubscriptionAlert = () => {
  const params = useSearchParams();

  const { onOpen: onOpenFail } = useFailModal();
  const { onOpen: onOpenSuccess } = useSuccessModal();

  const canceled = params.get("canceled");
  const success = params.get("success");

  useEffect(() => {
    if (canceled) onOpenFail();

    if (success) onOpenSuccess();
  }, [canceled, onOpenFail, success, onOpenSuccess]);

  return null;
};

export default SubscriptionAlert;
