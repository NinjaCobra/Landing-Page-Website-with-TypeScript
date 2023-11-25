import { LoginForm } from "@/components/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  console.log(session);
  if (session?.user) return redirect("/");

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-screen flex-1 items-center justify-center bg-slate-400 p-4">
        <LoginForm />
      </div>
      <div className="flex h-screen flex-1 flex-col items-center justify-center gap-y-4 bg-blue-500 p-4">
        <h1 className="font-Raleway text-4xl font-bold text-slate-200">
          Roomo
        </h1>
        <p className="text-xl text-white">
          Stay Organized, Stay Ahead – Sign In to Roomo.
        </p>
      </div>
    </div>
  );
}
