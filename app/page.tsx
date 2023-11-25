import Background from "@/components/Background";
import DraggableContainer from "@/components/DraggableContainer";
import LogoutButton from "@/components/LogoutButton";
import SoundControl from "@/components/SoundControl";
import SpaceDropDown from "@/components/SpaceDropDown";
import WidgetDropDown from "@/components/WidgetDropDown";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export default async function page() {
  const session = await auth();

  console.log(session);
  if (!session?.user) return redirect("/login");

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-black p-8 text-white">
      <Background />

      <p className="relative text-xl text-white/80">
        {session?.user?.name?.split(" ")[0].toUpperCase() ?? "Guest"}&apos;S
        ROOM
      </p>
      <div className="relative mb-4 flex items-center">
        <SpaceDropDown />
        <WidgetDropDown />

        <LogoutButton />
      </div>
      <DraggableContainer />

      <div className="relative mx-auto flex h-16 items-center justify-center gap-10 rounded-full bg-slate-500/60 px-12">
        <SoundControl />
        <span className="h-10 w-[1px] bg-white"></span>
        <div className="flex items-center gap-5">
          <IoSettingsOutline size={26} className="cursor-pointer" />
          <FaUserAlt size={22} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
