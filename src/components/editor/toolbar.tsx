"use client";

import React, { useState } from "react";
import {
  RxArrowDown,
  RxArrowUp,
  RxBorderWidth,
  RxTransparencyGrid,
} from "react-icons/rx";
import { TbColorFilter } from "react-icons/tb";
import {
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDown,
  CopyIcon,
  ItalicIcon,
  SquareSplitHorizontal,
  StrikethroughIcon,
  Trash2Icon,
  UnderlineIcon,
} from "lucide-react";

import {
  ActiveTool,
  Editor,
  FONT_SIZE,
  FONT_STYLE,
  FONT_WEIGHT,
} from "@/types/editor";

import Hint from "../hint";

import { Button } from "../ui/button";

import { cn, isTextType } from "@/lib/utils";
import FontSizeInput from "./sidebar/font-size-input";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const [properties, setProperties] = useState({
    fillColor: editor?.getActiveFillColor(),
    strokeColor: editor?.getActiveStrokeColor(),
    fontFamily: editor?.getActiveFontFamily(),
    fontWeight: editor?.getActiveFontWeight() || FONT_WEIGHT,
    fontStyle: editor?.getActiveFontStyle() || FONT_STYLE,
    linethrough: editor?.getActiveFontLinethrough(),
    underline: editor?.getActiveFontUnderline(),
    textAlign: editor?.getActiveTextAlign(),
    fontSize: editor?.getActiveFontSize() || FONT_SIZE,
  });

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const toggleBold = () => {
    if (!selectedObject) return;

    const newValue = properties.fontWeight > 500 ? 500 : 700;

    editor?.changeFontWeight(newValue);
    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";

    editor?.changeFontStyle(newValue);
    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  };

  const toggleLinethrough = () => {
    if (!selectedObject) return;

    const newValue = properties.linethrough ? false : true;
    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({
      ...current,
      linethrough: newValue,
    }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) return;

    const newValue = properties.underline ? false : true;
    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({
      ...current,
      underline: newValue,
    }));
  };

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) return;

    editor?.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  };

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) return;

    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div
        className="shrink-0 h-[56px] w-full border-b 
    bg-slate-50 dark:bg-slate-700 flex items-center overflow-x-auto z-[40] p-2 gap-x-2"
      />
    );
  }

  return (
    <div
      className="shrink-0 h-[56px] w-full border-b 
    bg-slate-50 dark:bg-slate-700 flex items-center overflow-x-auto z-[40] p-2 gap-x-2"
    >
      {!isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "fill" && "bg-muted")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isText && (
        <>
          <div className="flex items-center h-full justify-center">
            <Hint label="Border color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "stroke-color" && "bg-muted")}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{
                    borderColor: properties.strokeColor,
                  }}
                />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Border width" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-width")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "stroke-width" && "bg-muted")}
              >
                <RxBorderWidth className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
      )}

      {isText && (
        <>
          <div className="flex items-center h-full justify-center">
            <Hint label="Font" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("font")}
                size="icon"
                variant="ghost"
                className={cn(
                  "w-auto px-2 text-sm",
                  activeTool === "font" && "bg-muted"
                )}
              >
                <div className="max-w-auto truncate">
                  {properties.fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Bold" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleBold}
                size="icon"
                variant="ghost"
                className={cn(properties.fontWeight > 500 && "bg-muted")}
              >
                <BoldIcon className="size-4 " />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Italic" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleItalic}
                size="icon"
                variant="ghost"
                className={cn(properties.fontStyle === "italic" && "bg-muted")}
              >
                <ItalicIcon className="size-4 " />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Underline" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleUnderline}
                size="icon"
                variant="ghost"
                className={cn(properties.underline && "bg-muted")}
              >
                <UnderlineIcon className="size-4 " />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Strike" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleLinethrough}
                size="icon"
                variant="ghost"
                className={cn(properties.linethrough && "bg-muted")}
              >
                <StrikethroughIcon className="size-4 " />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Text Align Left" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("left")}
                size="icon"
                variant="ghost"
                className={cn(properties.textAlign === "left" && "bg-muted")}
              >
                <AlignLeftIcon className="size-4 " />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Text Align Center" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("center")}
                size="icon"
                variant="ghost"
                className={cn(properties.textAlign === "center" && "bg-muted")}
              >
                <AlignJustifyIcon className="size-4 " />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Text Align Right" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("right")}
                size="icon"
                variant="ghost"
                className={cn(properties.textAlign === "right" && "bg-muted")}
              >
                <AlignRightIcon className="size-4 " />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <FontSizeInput
              value={properties.fontSize}
              onChange={onChangeFontSize}
            />
          </div>
        </>
      )}

      {isImage && (
        <>
          <div className="flex items-center h-full justify-center">
            <Hint label="Filters" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("filter")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "filter" && "bg-muted")}
              >
                <TbColorFilter className="size-4" />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Remove background" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("remove-bg")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "remove-bg" && "bg-muted")}
              >
                <SquareSplitHorizontal className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
      )}

      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-muted")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <RxArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Backward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackward()}
            size="icon"
            variant="ghost"
          >
            <RxArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Duplicate" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.onCopy();
              editor?.onPaste();
            }}
            size="icon"
            variant="ghost"
          >
            <CopyIcon className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button onClick={() => editor?.delete()} size="icon" variant="ghost">
            <Trash2Icon className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
