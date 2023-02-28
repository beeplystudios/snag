import { createGoalSchema } from "@/shared/schemas";
import { api } from "@/utils/api";
import { useCallback } from "react";
import type { z } from "zod";
import { TsForm } from "../ui/forms/ts-form";

export const CreateGoal: React.FC = () => {
  const createGoal = api.goal.create.useMutation();
  const trpcContext = api.useContext();

  const onSubmit = useCallback(
    async (values: z.infer<typeof createGoalSchema>) => {
      await createGoal.mutateAsync(values);
      await trpcContext.goal.getMine.invalidate();
    },
    [createGoal, trpcContext]
  );

  return (
    <TsForm
      schema={createGoalSchema}
      onSubmit={onSubmit}
      formProps={{
        className: "flex flex-col w-96 gap-4",
      }}
      props={{
        content: {
          label: "Content",
        },
        frequency: {
          label: "Frequency",
          description: "How often do you want to do this (in days)?",
        },
        description: {
          label: "Description",
          description: "What are you doing in this goal?",
        },
      }}
      renderAfter={() => <button type="submit">Create Goal</button>}
    />
  );
};
