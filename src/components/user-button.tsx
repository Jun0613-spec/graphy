"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
  CreditCard,
  Crown,
  Home,
  Loader,
  LogOut,
  MessageCircleQuestion,
  Settings,
  SunMoon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserbuttonItem from "./user-button-item";

import { usePaywall } from "@/hooks/subscription/use-paywall";
import { useBilling } from "@/queries/subscriptions/use-billing";

const UserButton = () => {
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
  const mutation = useBilling();
  const session = useSession();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate();
  };

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data?.user?.name!;
  const imageUrl = session.data?.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {!shouldBlock && !isLoading && (
          <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
            <div className="rounded-full bg-white flex items-center justify-center p-1 drop-shadow-sm">
              <Crown className="size-3 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        )}
        <Avatar className="size-10  transition">
          <AvatarImage alt={name} src={imageUrl || ""} />
          <AvatarFallback
            className="bg-emerald-400 dark:bg-emerald-500 hover:bg-emerald-400/90 dark:hover:bg-emerald-500/90
          font-medium text-white flex items-center justify-center"
          >
            {name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 dark:bg-slate-700 ">
        <DropdownMenuItem className="h-10  cursor-pointer">
          <UserbuttonItem href="/" icon={Home} label="Home" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={mutation.isPending}
          onClick={onClick}
          className="h-10 cursor-pointer"
        >
          <CreditCard className="size-4 mr-2" />
          Billing
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="h-10 cursor-pointer">
          <UserbuttonItem href="/setting" icon={Settings} label="Setting" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="h-10  cursor-pointer">
          <UserbuttonItem
            href="mailto:kumo5110@gmail.com"
            icon={MessageCircleQuestion}
            label="Get Help"
          />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="h-10 cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="size-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
