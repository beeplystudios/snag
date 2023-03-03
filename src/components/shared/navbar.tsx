import useWindowSize from "@/utils/use-window-size";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { BsInbox } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { RiTodoLine, RiTodoFill } from "react-icons/ri"
import { Inbox } from "../goals/inbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Tab from "./tab";

export interface ITab {
  name: string;
  href: string;
  OnIcon: IconType;
  OffIcon: IconType;
}

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const { isMobile } = useWindowSize();

  const mainTabs: ITab[] = [
    {
      // TODO: better name
      name: "My Dashboard",
      href: "/dashboard",
      OnIcon: RiTodoFill,
      OffIcon: RiTodoLine,
    },
  ];

  return (
    <div className="flex w-full justify-center py-2 shadow-md">
      <div className="flex w-full max-w-6xl justify-between p-2">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/logo.svg" alt="" width={30} height={10} />
          </Link>

          {mainTabs.map((tab, i) => (
            <Tab key={i} {...tab} />
          ))}
        </div>

        <div className="flex gap-4">
          <div className="flex gap-2 rounded-md bg-green-300 py-1 px-2 font-medium">
            <div className="flex gap-2">
              <Image src="/Snag coin.svg" width={20} height={10} alt="coins" />
              <p>{session?.user.points}</p>
            </div>
            <p>·</p>
            <p>{session?.user.streak} day streak</p>
          </div>
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 rounded-md px-2 font-medium transition-colors hover:bg-gray-200 ">
              <BsInbox />
              {!isMobile && "Inbox"}
            </PopoverTrigger>
            <PopoverContent className="h-[28rem] w-[32rem]">
              <Inbox />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={session?.user.image || ""}
                  alt={session?.user.name || ""}
                />
                <AvatarFallback>
                  {session?.user.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isMobile && (
                <p className="font-medium text-neutral-800">
                  {session?.user.name}
                </p>
              )}
              <FaChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/profile/${session?.user.slug || ""}`}>
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => void signOut({ callbackUrl: "/" })}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
