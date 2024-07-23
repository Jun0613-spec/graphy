"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { useSubscriptionModal } from "@/hooks/subscription/store/use-subscription-modal";

import { useCheckout } from "@/queries/subscriptions/use-checkout";

const SubscriptionModal = () => {
  const mutation = useCheckout();

  const { isOpen, onClose } = useSubscriptionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-slate-800">
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center">
            Unlock advanced features with our premium plan
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-emerald-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited projects</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-emerald-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited templates</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-emerald-500 text-white" />
            <p className="text-sm text-muted-foreground">
              AI Background removal
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-emerald-500 text-white" />
            <p className="text-sm text-muted-foreground">AI Image generation</p>
          </li>
        </ul>

        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full 
              bg-emerald-500 
              hover:bg-emerald-500/90  
              dark:bg-emerald-600 
              dark:hover:bg-emerald-600/90 
              text-white"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
