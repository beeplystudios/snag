import Link from "next/link";
import { useRouter } from "next/router";

const Tab: React.FC<{ name: string; href: string }> = ({ name, href }) => {
  const router = useRouter();
  const selected = router.pathname === href;

  return (
    <div className="flex h-full flex-col ">
      <div
        className={`${
          selected ? "text-text-100" : "text-text-200"
        } flex h-full flex-1 flex-col justify-center`}
      >
        <Link href={href}>
          <p className="transition hover:-translate-y-0.5">{name}</p>
        </Link>
      </div>

      {selected && <div className=" bg-text-100 h-[2px] w-full rounded" />}
    </div>
  );
};

export default Tab;
