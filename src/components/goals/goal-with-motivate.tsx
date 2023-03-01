import { sendMotivationSchema } from "@/shared/schemas";
import { api, type RouterOutputs } from "@/utils/api";
import clsx from "clsx";
import Link from "next/link";
import { useCallback } from "react";
import type { z } from "zod";
import { Button } from "../ui/button";
import { TsForm } from "../ui/forms/ts-form";
import { MotivateModal } from "./motivate";

export type GoalWithAuthor = RouterOutputs["goal"]["getAll"] extends {
  goals: (infer T)[];
}
  ? T
  : never;

export const GoalWithMotivate: React.FC<{
  goal: GoalWithAuthor;
}> = ({ goal }) => {
  const motivate = api.goal.motivate.useMutation({
    // onSuccess() {}
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof sendMotivationSchema>) => {
      motivate.mutate({
        goalId: goal.id,
        ...values,
      });
    },
    [goal, motivate]
  );

  const checked = !!goal.completedAt;

  return (
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
      <div className="flex items-center justify-between">
        <div className="ml-2 flex flex-1 flex-col items-start">
          <Link
            href={`/profile/${goal.author.slug}`}
            className="text-slate-700 underline"
          >
            <p>
              {goal.author.name} ({goal.author.slug})
            </p>
          </Link>
          <h3 className="text-lg font-medium">{goal.content}</h3>
          <p className="">{goal.description ?? <br />}</p>
        </div>
        <MotivateModal goal={goal} />
      </div>
    </div>
  );
};
