import { signOut } from "../lib/auth";
import { Button } from "./ui/button";

export default async function SignoutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
