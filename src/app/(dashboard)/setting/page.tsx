import React from "react";

import Appearance from "@/components/appearance";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SettingPage = () => {
  return (
    <div className="p-6">
      <p className="text-xl font-bold mb-4">Settings</p>
      <Separator />
      <div className=" p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Theme</Label>
          <Appearance />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
