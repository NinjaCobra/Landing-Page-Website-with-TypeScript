"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegStickyNote } from "react-icons/fa";

const data = [
  {
    catrgory: "Nature",
    icon: "🌲",
    items: [
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
    ],
  },
  {
    catrgory: "Beach",
    icon: "🏖️",
    items: [
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
    ],
  },
  {
    catrgory: "City",
    icon: "🏙️",
    items: [
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
    ],
  },
  {
    catrgory: "Cafe",
    icon: "☕",
    items: [
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
      {
        video: "https://www.youtube.com/watch?v=yZJoG1VcLAw",
        title: "Nature screen 1",
      },
    ],
  },
];

export default function SpaceDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer text-3xl outline-none">
        Nature<span className="text-5xl">🌲</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 grid grid-cols-2 gap-4 border-slate-950 bg-slate-950/95 px-4 pb-4 pt-2 text-white">
        <DropdownMenuLabel className="col-span-2 flex items-center gap-5 py-5">
          {data.map((item) => (
            <div key={item.catrgory} className="flex items-center">
              <span>{item.catrgory}</span>
              <span className="ml-2 text-2xl">{item.icon}</span>
            </div>
          ))}
        </DropdownMenuLabel>

        {/*  */}
        <DropdownMenuItem
          className="h-40 w-80 rounded-md bg-white py-5"
          onClick={() => console.log("OPEN")}
        ></DropdownMenuItem>
        <DropdownMenuItem
          className="h-40 w-80 rounded-md bg-white py-5"
          onClick={() => console.log("OPEN")}
        ></DropdownMenuItem>
        <DropdownMenuItem
          className="h-40 w-80 rounded-md bg-white py-5"
          onClick={() => console.log("OPEN")}
        ></DropdownMenuItem>
        <DropdownMenuItem
          className="h-40 w-80 rounded-md bg-white py-5"
          onClick={() => console.log("OPEN")}
        ></DropdownMenuItem>
        <DropdownMenuItem
          className="h-40 w-80 rounded-md bg-white py-5"
          onClick={() => console.log("OPEN")}
        ></DropdownMenuItem>
        <DropdownMenuItem
          className="h-40 w-80 rounded-md bg-white py-5"
          onClick={() => console.log("OPEN")}
        ></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
