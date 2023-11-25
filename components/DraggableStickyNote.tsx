"use client";

import React, { useState, useRef } from "react";
import { useStickyNotes } from "@/store";
import { Card } from "@/components/ui/card";
import { IoRemove } from "react-icons/io5";
import { PiSquaresFourDuotone } from "react-icons/pi";

interface DraggableStickyNoteProps {
  containerRef: React.RefObject<HTMLDivElement>;
  id: number;
  content: string;
  key: number;
}

export default function DraggableStickyNote({
  containerRef,
  id,
  content,
}: DraggableStickyNoteProps) {
  const notes = useStickyNotes();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [noteContent, setNoteContent] = useState(content);

  const NoteRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!target.closest("[data-draggable]")) return;

    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && NoteRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const timerRect = NoteRef.current.getBoundingClientRect();

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

  return (
    <Card
      ref={NoteRef}
      className={`absolute flex min-h-44 w-60 select-none flex-col rounded-none rounded-bl-md border-none bg-yellow-400/95 p-2 text-white ${
        isDragging ? "opacity-75" : ""
      }`}
      style={{
        background: `linear-gradient(45deg, transparent 10px,  rgb(250 204 21 / 0.95) 0)`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      role="timer"
      aria-label="Draggable Note"
    >
      <div
        className={`flex items-center justify-between pb-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        data-draggable
      >
        <span className="h-full">
          <PiSquaresFourDuotone size={24} />
        </span>
        <span
          onClick={() => notes.removeNote(id)}
          className="h-full cursor-pointer"
        >
          <IoRemove size={24} />
        </span>
      </div>
      <div className="relative flex-1 pb-4">
        {/* corner ticket */}
        <div className="absolute bottom-[-8px] left-[-8px] h-0 w-0 border-b-[8px] border-l-[8px] border-r-[8px] border-t-[8px] border-yellow-600 border-b-transparent border-l-transparent"></div>
        {isEditingContent ? (
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            onBlur={() => setIsEditingContent(false)}
            autoFocus
            className="h-full min-h-[100px] flex-1 resize-none bg-transparent font-semibold text-white outline-none"
          />
        ) : (
          <p
            className="h-full min-h-28 w-full flex-1 whitespace-pre-wrap break-words font-semibold"
            onClick={() => setIsEditingContent(true)}
          >
            {noteContent || "Add your note ..."}
          </p>
        )}
      </div>
    </Card>
  );
}
