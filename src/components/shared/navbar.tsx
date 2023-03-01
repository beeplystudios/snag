import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Tab from "./tab";
import Link from "next/link";
import { BsInbox, BsFillGrid3X3GapFill, BsGrid3X3Gap } from "react-icons/bs";
import { IoPersonCircleOutline, IoPersonCircle } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Inbox } from "../goals/inbox";
import type { IconType } from "react-icons";

export interface ITab {
  name: string;
  href: string;
  OnIcon: IconType;
  OffIcon: IconType;
}

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const mainTabs: ITab[] = [
    {
      name: "My Profile",
      href: "/",
      OnIcon: IoPersonCircle,
      OffIcon: IoPersonCircleOutline,
    },
    {
      // TODO: better name
      name: "All Goals",
      href: "/all",
      OnIcon: BsFillGrid3X3GapFill,
      OffIcon: BsGrid3X3Gap,
    },
  ];

  return (
    <div className="flex h-[50px] w-screen items-center justify-between px-8 shadow md:px-20">
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
