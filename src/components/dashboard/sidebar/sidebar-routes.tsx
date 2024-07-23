"use client";

import { usePathname } from "next/navigation";
import {
  CreditCard,
  Crown,
  Home,
  MessageCircleQuestion,
  Settings,
  SunMoon,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import SidebarItem from "./sidebar-item";

import { useCheckout } from "@/queries/subscriptions/use-checkout";
import { useBilling } from "@/queries/subscriptions/use-billing";
import { usePaywall } from "@/hooks/subscription/use-paywall";

const SidebarRoutes = () => {
  const mutation = useCheckout();
  const billingMutation = useBilling();
  const { shouldBlock, isLoading, triggerPaywall } = usePaywall();

  const pathname = usePathname();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    billingMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 dark:bg-emerald-600 transition"
              variant="outline"
              size="lg"
            >
              <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
              Upgrade to Pro
            </Button>
          </div>
          <div className="px-3">
            <Separator />
          </div>
        </>
      )}
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={Home}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>

      <Separator className="px-3 dark:bg-slate-700" />

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCard}
          label="Billing"
          onClick={onClick}
        />
        <SidebarItem
          href="/setting"
          icon={Settings}
          label="Setting"
          isActive={pathname === "/setting"}
        />
        <SidebarItem
          href="mailto:kumo5110@gmail.com"
          icon={MessageCircleQuestion}
          label="Get Help"
        />
      </ul>
    </div>
  );
};

export default SidebarRoutes;
