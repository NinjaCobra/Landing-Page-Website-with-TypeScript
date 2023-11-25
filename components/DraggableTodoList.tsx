"use client";

import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { IoRemove } from "react-icons/io5";
import { CheckCircle, CircleIcon, CircleX } from "lucide-react";
import { useTodoList } from "@/store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface DraggableTodoListProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function DraggableTodoList({
  containerRef,
}: DraggableTodoListProps) {
  const todoList = useTodoList();
  const [position, setPosition] = useState({ x: 0, y: 190 });
  const [isDragging, setIsDragging] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");
  const todoRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!target.closest("[data-draggable]")) return;

    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && todoRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const todoRect = todoRef.current.getBoundingClientRect();

        const newX = Math.max(
          0,
          Math.min(e.clientX - startX, containerRect.width - todoRect.width),
        );
        const newY = Math.max(
          0,
          Math.min(e.clientY - startY, containerRect.height - todoRect.height),
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

  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: taskText, completed: false },
    ]);
    setTaskText("");
  };

  const handleRemoveTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTask();
    }
  };

  return (
    <Card
      ref={todoRef}
      className={`w-100 absolute flex max-h-full min-h-44 select-none flex-col justify-between border-none bg-slate-950/95 p-2 text-center text-white ${
        isDragging ? "opacity-75" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      role="TodoList"
      aria-label="Draggable Todo List"
    >
      <div
        className={`flex items-center justify-between px-2 pb-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        data-draggable
      >
        <h2 className="text-xl">Tasks</h2>
        <span
          className="h-full cursor-pointer"
          onClick={() => todoList.hideTodoList()}
        >
          <IoRemove size={24} />
        </span>
      </div>

      <div className="flex items-center gap-2 px-2 py-2">
        <Input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a task..."
          className="h-8 flex-1 rounded-md border-none px-2 text-black outline-none"
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button
          onClick={handleAddTask}
          className="h-8 rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
        >
          Add
        </Button>
        <Button
          disabled={tasks.length === 0}
          onClick={() => setTasks([])}
          className="h-8 rounded-md bg-red-500 px-4 py-1 text-white hover:bg-red-600"
        >
          Clear All
        </Button>
      </div>

      <ul className="max-h-[80%] min-h-40 overflow-y-auto px-2 py-1">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-2 flex items-center justify-between gap-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              {task.completed ? (
                <CheckCircle
                  className="cursor-pointer rounded-full bg-blue-600"
                  onClick={() => handleToggleTask(task.id)}
                />
              ) : (
                <CircleIcon
                  className="cursor-pointer"
                  onClick={() => handleToggleTask(task.id)}
                />
              )}
              <span
                className={`cursor-pointer text-lg ${
                  task.completed ? "text-gray-500 line-through" : ""
                }`}
                onClick={() => handleToggleTask(task.id)}
              >
                {task.text}
              </span>
            </div>
            <span
              onClick={() => handleRemoveTask(task.id)}
              className="cursor-pointer text-red-500 hover:text-red-700"
            >
              <CircleX />
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
