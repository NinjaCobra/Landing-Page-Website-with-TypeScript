"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStickyNotes, useTimer, useTodoList } from "@/store";
import { FaRegStickyNote } from "react-icons/fa";
import { PiNotePencilBold, PiTimerBold } from "react-icons/pi";

export default function WidgetDropDown() {
  const timer = useTimer();
  const todoList = useTodoList();
  const note = useStickyNotes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit cursor-pointer rounded-full bg-slate-950/95 px-8 py-3 text-xl font-medium uppercase">
        + Widgets
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 min-w-64 border-slate-950 bg-slate-950/95 text-white">
        <DropdownMenuLabel className="py-5">ADD WIDGETS</DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-auto bg-white/40" />
        <DropdownMenuItem className="py-5" onClick={() => timer.showTimer()}>
          <PiTimerBold />
          <span>Timer</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="py-5"
          onClick={() => todoList.showTodoList()}
        >
          <PiNotePencilBold />
          <span>Todo List</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-5" onClick={() => note.addNote("")}>
          <FaRegStickyNote />
          <span>Sticky Notes</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
