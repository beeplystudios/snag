import { sendMotivationSchema } from "@/shared/schemas";
import { api, RouterOutputs } from "@/utils/api";
import type { Goal } from "@prisma/client";
import { useCallback } from "react";
import type { z } from "zod";
import { Button } from "../ui/button";
import { TsForm } from "../ui/forms/ts-form";

type GoalWithAuthor = RouterOutputs["goal"]["getAll"] extends {
  goals: (infer T)[];
}
  ? T
  : never;

export const GoalWithMotivate: React.FC<{
  goal: GoalWithAuthor;
}> = ({ goal }) => {
  const motivate = api.goal.motivate.useMutation();

  const onSubmit = useCallback(
    (values: z.infer<typeof sendMotivationSchema>) => {
      motivate.mutate({
        goalId: goal.id,
        ...values,
      });
    },
    [goal, motivate]
  );

  return (
    <div className="w-full border border-bg-200 py-2 px-8">
      <h1 className="text-2xl font-bold">{goal.content}</h1>
      <p className="text-white/70">{goal.description}</p>
      <p>
        by {goal.author.name} ({goal.author.slug})
      </p>

      <hr />

      <p>This is why we use chakra how do i do a modal</p>

      <TsForm
        schema={sendMotivationSchema}
        defaultValues={{
          points: 1,
        }}
        props={{
          message: { label: "Message" },
          points: { label: "Points" },
        }}
        onSubmit={onSubmit}
        renderAfter={() => (
          <Button className="mt-3" disabled={motivate.isLoading}>
            Motivate
          </Button>
        )}
      />
    </div>
  );
};
