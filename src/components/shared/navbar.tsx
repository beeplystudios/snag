import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Tab from "./tab";
import Link from "next/link";
import { BsInbox } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Inbox } from "../goals/inbox";

interface ITab {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const mainTabs: ITab[] = [
    {
      name: "My Profile",
      href: "/",
    },
    {
      // TODO: better name
      name: "All Goals",
      href: "/all",
    },
  ];

  return (
    <div className="flex h-[50px] w-screen items-center justify-between px-20 shadow">
      <Link href="/">
        <Image src="/logo.svg" alt="" width={30} height={10} />
      </Link>

      {mainTabs.map((tab, i) => (
        <Tab key={i} {...tab} />
      ))}

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger className="mr-2 rounded p-2 transition-colors hover:bg-gray-200">
            <BsInbox size={20} />
          </PopoverTrigger>
          <PopoverContent className="h-[28rem] w-[32rem]">
            <Inbox />
          </PopoverContent>
        </Popover>
        <p>{session?.user.name}</p>

        <button
          className="text-highlight ml-2 rounded bg-red-400 px-2.5 py-1 font-bold text-white no-underline transition hover:scale-105 hover:bg-red-500"
          onClick={() => {
            void signOut();
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
