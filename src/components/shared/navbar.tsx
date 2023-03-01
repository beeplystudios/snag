import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Tab from "./tab";
import Link from "next/link";
import { BsInbox, BsFillGrid3X3GapFill, BsGrid3X3Gap } from "react-icons/bs";
import { IoPersonCircleOutline, IoPersonCircle } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Inbox } from "../goals/inbox";
import type { IconType } from "react-icons";
import { Button } from "../ui/button";

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
      // TODO: better name
      name: "All Goals",
      href: "/all",
      OnIcon: BsFillGrid3X3GapFill,
      OffIcon: BsGrid3X3Gap,
    },
  ];

  return (
    <div className="flex w-full justify-center shadow-md">
      <div className="flex w-full max-w-6xl justify-between p-2">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/logo.svg" alt="" width={30} height={10} />
          </Link>

          {mainTabs.map((tab, i) => (
            <Tab key={i} {...tab} />
          ))}
        </div>

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

          <Button
            size="sm"
            className="bg-red-400"
            onClick={() => {
              void signOut();
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
