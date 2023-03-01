import useWindowSize from "@/utils/use-window-size";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ITab } from "./navbar";

const Tab: React.FC<ITab> = ({ name, href, OnIcon, OffIcon }) => {
  const router = useRouter();
  const selected = router.pathname === href;
  const { isMobile } = useWindowSize();

  return (
    <div className="flex h-full flex-col ">
      <div
        className={`${
          selected ? "font-semibold" : "font-normal"
        } flex h-full flex-1 flex-col justify-center`}
      >
        <Link href={href}>
          {isMobile ? (
            selected ? (
              <OnIcon />
            ) : (
              <OffIcon />
            )
          ) : (
            <p className="transition hover:-translate-y-0.5">{name}</p>
          )}
        </Link>
      </div>

      {selected && <div className=" bg-text-100 h-[2px] w-full rounded" />}
    </div>
  );
};

export default Tab;
