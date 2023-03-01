import { api, type RouterOutputs } from "@/utils/api";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

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
          "rounded-md p-4",
          checked ? "bg-green-200" : "bg-red-200"
        )}
      >
        <div className="flex flex-1 flex-col items-start">
          <h3 className="text-lg font-bold">{goal.content}</h3>
          <p className="text-black/40">{goal.description ?? <br />}</p>
        </div>
      </div>
    </Link>
  );
};

export default Goal;
