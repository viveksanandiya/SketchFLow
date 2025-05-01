import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-content items-center">

      <div className="ml-auto bg-red-400 m-4 rounded-md">
        <Link href="/signin">
        <Button 
          variant= "primary"
          size="lg"
          className="h-12 px-6"
        >
          Signin
        </Button>
        </Link>
      </div>

      <div className="mr-auto bg-blue-400 m-4 rounded-md">
        <Link href="/signup">
        <Button 
          variant= "outline"
          size="lg"
          className="h-12 px-6"
        >
          Signup
        </Button>
        </Link>
      </div>

    </div>   
  );
}
