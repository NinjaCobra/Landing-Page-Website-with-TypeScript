"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTimer } from "@/store";
import { Card } from "@/components/ui/card";
import { IoRefreshCircle, IoRemove } from "react-icons/io5";
import { Settings } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface DraggableTimerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const formatInput = (value: number) => value.toString().padStart(2, "0");

export default function DraggableTimer({ containerRef }: DraggableTimerProps) {
  const timer = useTimer();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [checked, setChecked] = useState(0);
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);
  const [isModified, setIsModified] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const timerRef = useRef<HTMLDivElement>(null);

  // Timer countdown
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!target.closest("[data-draggable]")) return;

    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && timerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const timerRect = timerRef.current.getBoundingClientRect();

        const newX = Math.max(
          0,
          Math.min(e.clientX - startX, containerRect.width - timerRect.width),
        );
        const newY = Math.max(
          0,
          Math.min(e.clientY - startY, containerRect.height - timerRect.height),
        );

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const num = parseInt(value, 10);
    setter(num || 0);
    if (num > 0 || value === "") {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  };

  const saveSettings = () => {
    setIsModified(false);
    if (checked === 0) setTime(pomodoro * 60);
    if (checked === 1) setTime(shortBreak * 60);
    if (checked === 2) setTime(longBreak * 60);
    setShowSettings(false);
  };

  if (!timer) return null;

  return (
    <Card
      ref={timerRef}
      className={`absolute flex min-h-48 w-96 select-none flex-col justify-between gap-1 border-none bg-slate-950/95 p-2 text-center font-Oswald text-white ${
        isDragging ? "opacity-75" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      role="timer"
      aria-label="Draggable Timer"
    >
      <div
        className={`flex h-12 items-center justify-between border-b-2 border-b-gray-400 px-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        data-draggable
      >
        <h2 className="text-xl">Timer</h2>
        <span
          onClick={() => timer.hideTimer()}
          className="flex h-full cursor-pointer items-center"
        >
          <IoRemove size={32} />
        </span>
      </div>

      <div className="flex cursor-default items-center justify-between gap-2 p-4 pb-5">
        <h3 className="w-24 text-start text-4xl font-bold">
          {formatTime(time)}
        </h3>
        <button
          className="border-1 w-24 rounded-md border-gray-700 bg-slate-50 p-2 font-bold text-black"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <span
          onClick={() => {
            if (checked === 0) setTime(pomodoro * 60);
            if (checked === 1) setTime(shortBreak * 60);
            if (checked === 2) setTime(longBreak * 60);
            setIsRunning(false);
          }}
          className="flex cursor-pointer justify-center"
          title="Refresh"
        >
          <IoRefreshCircle size={40} />
        </span>
      </div>

      <ul className="flex cursor-default justify-between px-2 pb-5">
        <li>
          <p
            className={`cursor-pointer pb-1 hover:opacity-80 ${
              checked === 0 && "border-b-2 border-gray-300"
            }`}
            onClick={() => {
              setTime(pomodoro * 60);
              setIsRunning(false);
              setChecked(0);
            }}
          >
            Pomodoro
          </p>
        </li>
        <li>
          <p
            className={`cursor-pointer pb-1 hover:opacity-80 ${
              checked === 1 && "border-b-2 border-gray-300"
            }`}
            onClick={() => {
              setTime(shortBreak * 60);
              setIsRunning(false);
              setChecked(1);
            }}
          >
            Short break
          </p>
        </li>
        <li>
          <p
            className={`cursor-pointer pb-1 hover:opacity-80 ${
              checked === 2 && "border-b-2 border-gray-300"
            }`}
            onClick={() => {
              setTime(longBreak * 60);
              setIsRunning(false);
              setChecked(2);
            }}
          >
            Long break
          </p>
        </li>
        <li>
          <Settings
            className="cursor-pointer pb-1 hover:opacity-80"
            onClick={() => setShowSettings(!showSettings)}
          />
        </li>
      </ul>

      {showSettings && (
        <div className="border-t-2 border-solid border-gray-200 pt-2">
          <ul className="flex cursor-default justify-between gap-2 px-2 pb-2">
            <li>
              <Label
                htmlFor="pomodoro"
                className="cursor-pointer text-sm text-gray-200"
              >
                Pomodoro
              </Label>
              <Input
                id="pomodoro"
                type="text"
                inputMode="numeric"
                className="mt-2 appearance-none bg-white text-black"
                value={formatInput(pomodoro)}
                onChange={(e) => handleInputChange(e.target.value, setPomodoro)}
              />
            </li>
            <li>
              <Label
                htmlFor="short"
                className="cursor-pointer text-sm text-gray-200"
              >
                Short break
              </Label>
              <Input
                id="short"
                type="text"
                inputMode="numeric"
                className="mt-2 appearance-none bg-white text-black"
                value={formatInput(shortBreak)}
                onChange={(e) =>
                  handleInputChange(e.target.value, setShortBreak)
                }
              />
            </li>
            <li>
              <Label
                htmlFor="long"
                className="cursor-pointer text-sm text-gray-200"
              >
                Long break
              </Label>
              <Input
                id="long"
                type="text"
                inputMode="numeric"
                className="mt-2 appearance-none bg-white text-black"
                value={formatInput(longBreak)}
                onChange={(e) =>
                  handleInputChange(e.target.value, setLongBreak)
                }
              />
            </li>
          </ul>
          {isModified && (
            <div className="px-2">
              <Button onClick={saveSettings} className="w-full bg-blue-500">
                Save
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
