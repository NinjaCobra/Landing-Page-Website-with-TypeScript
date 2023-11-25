import { signOut } from "@/lib/auth";
import React from "react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <form
      className="ml-auto"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="bg-white text-black hover:bg-white/90">
        Sign Out
      </Button>
    </form>
  );
}
