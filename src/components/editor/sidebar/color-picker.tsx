"use client";

import { useTheme } from "next-themes";
import React from "react";
import { ChromePicker, CirclePicker } from "react-color";

import { colors } from "@/types/editor";

import { rgbaObjectToString } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const { theme } = useTheme();

  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="border !w-auto shadow-none !rounded-lg !overflow-hidden"
      />

      <CirclePicker
        className="!w-auto"
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};

export default ColorPicker;
