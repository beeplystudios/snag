import useWindowSize from "@/utils/use-window-size";
import Link from "next/link";
import { useRouter } from "next/router";
import type { IconType } from "react-icons";

const Tab: React.FC<{ name: string; href: string; Icon: IconType }> = ({
  name,
  href,
  Icon,
}) => {
  const router = useRouter();
  const selected = router.pathname === href;
  const { isMobile } = useWindowSize();

  return (
    <div className="flex h-full flex-col ">
      <div
        className={`${
          selected ? "text-text-100" : "text-text-200"
        } flex h-full flex-1 flex-col justify-center`}
      >
        <Link href={href}>
          {isMobile ? (
            <Icon className="h-full" />
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
