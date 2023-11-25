"use client";

import React, { useRef } from "react";
import DraggableTimer from "./DraggableTimer";
import { useStickyNotes, useTimer, useTodoList } from "@/store";
import DraggableTodoList from "./DraggableTodoList";
import DraggableStickyNote from "./DraggableStickyNote";

export default function DraggableContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const timer = useTimer((state) => state.timer);
  const todoList = useTodoList((state) => state.todoList);
  const notes = useStickyNotes((state) => state.notes);
  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex-grow overflow-hidden rounded-lg"
      aria-label="Timer Container"
    >
      {timer && <DraggableTimer containerRef={containerRef} />}
      {todoList && <DraggableTodoList containerRef={containerRef} />}
      {/* {todoList && <DraggableTodoList containerRef={containerRef} />} */}
      {notes &&
        notes.map((note) => (
          <DraggableStickyNote
            containerRef={containerRef}
            id={note.id}
            content={note.content}
            key={note.id}
          />
        ))}
    </div>
  );
}
