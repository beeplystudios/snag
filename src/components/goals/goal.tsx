import type { RouterOutputs } from "@/utils/api";
import clsx from "clsx";
import Link from "next/link";

type GoalWithMessages = RouterOutputs["goal"]["getMine"] extends (infer T)[]
  ? T
  : never;

const Goal: React.FC<{
  goal: GoalWithMessages;
  checked?: boolean;
}> = ({ goal, checked = false }) => {
  return (
    <Link href={`/goals/${goal.id}`}>
      <div
        className={clsx(
          "relative rounded-md border border-slate-400 bg-slate-50 p-4"
        )}
      >
        <div
          className={clsx(
            "absolute top-0 left-0 h-full w-2 rounded-l-md",
            checked && "bg-green-200",
            !checked && "bg-red-200"
          )}
        ></div>
        <div className="ml-2 flex flex-1 flex-col items-start">
          <h3 className="text-lg font-bold">{goal.content}</h3>
          <p className="text-black/40">{goal.description ?? <br />}</p>
        </div>
      </div>
    </Link>
  );  
};

export default Goal;
5;
10;
