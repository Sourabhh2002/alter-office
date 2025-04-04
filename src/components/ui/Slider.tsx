"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { cn } from "@lib/utils/tailwindUtils";

interface CustomSliderProps {
  max: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
  className?: string;
  showLabelText?: boolean;
  labelText?: string;
}

export default function CustomSlider({
  max = 6,
  onChange,
  defaultValue = 0,
  className,
  showLabelText = true,
  labelText = "yrs",
}: CustomSliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate positions for the knob and labels
  const calculatePosition = (val: number) => {
    const paddingPercentage = 5;
    return paddingPercentage + (val / max) * (100 - paddingPercentage * 2);
  };

  // Snap to the nearest valid value
  const snapToNearestValue = (percentage: number) => {
    const paddingPercentage = 5;
    const adjustedPercentage =
      Math.max(0, Math.min(100, percentage)) - paddingPercentage;
    const usableWidth = 100 - paddingPercentage * 2;
    const stepSize = usableWidth / max;

    if (adjustedPercentage < 0) return 0;

    const nearestStep = Math.round(adjustedPercentage / stepSize);
    return Math.min(max, Math.max(0, nearestStep));
  };

  // Handle mouse/touch down on the track
  const handleTrackClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

    const percentage = ((clientX - rect.left) / rect.width) * 100;
    const newValue = snapToNearestValue(percentage);

    setValue(newValue);
    onChange?.(newValue);
  };

  // Handle mouse/touch move during drag
  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clientX =
      "touches" in e
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;

    const percentage = ((clientX - rect.left) / rect.width) * 100;
    const newValue = snapToNearestValue(percentage);

    setValue(newValue);
    onChange?.(newValue);
  };

  // Handle mouse/touch up to end dragging
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Set up event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("touchmove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  // Generate labels for the slider
  const renderLabels = () => {
    const labels = [];
    for (let i = 0; i <= max; i++) {
      const label = i === max ? `${i}+` : i.toString();
      labels.push(
        <div
          key={i}
          className="absolute top-12 -translate-x-1/2 text-white font-HamonBold space-x-1"
          style={{ left: `${calculatePosition(i)}%` }}
        >
          <span className="text-[30px] sm:text-[50px] md:text-[69px]">
            {label}
          </span>

          {showLabelText && (
            <span className="text-[12px] sm:text-[20px] md:text-[26px]">
              {labelText}
            </span>
          )}
        </div>
      );
    }
    return labels;
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Track */}
      <div
        ref={trackRef}
        className="h-3 bg-white w-full cursor-pointer"
        onClick={handleTrackClick}
        onTouchStart={handleTrackClick}
      >
        {/* Knob */}
        <div
          className="absolute top-1 size-[70px] sm:size-[80px] md:size-[96px] rounded-[6px] bg-[#2933AF] -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${calculatePosition(value)}%` }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        ></div>
      </div>

      {/* Labels */}
      <div className="relative w-full">{renderLabels()}</div>
    </div>
  );
}
