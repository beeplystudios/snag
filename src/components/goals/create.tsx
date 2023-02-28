import { createGoalSchema } from "@/shared/schemas";
import { api } from "@/utils/api";
import { useCallback, useState } from "react";
import type { z } from "zod";
import { TsForm } from "../ui/forms/ts-form";
import Button from "../ui/button";

export const CreateGoal: React.FC = () => {
  const createGoal = api.goal.create.useMutation();
  const trpcContext = api.useContext();
  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(
    async (values: z.infer<typeof createGoalSchema>) => {
      await createGoal.mutateAsync(values);
      await trpcContext.goal.getMine.invalidate();
    },
    [createGoal, trpcContext]
  );

  return (
    <div className="flex w-full items-start gap-4 p-4">
      <label>
        <button className="hidden" onClick={() => setOpen(!open)} />
        <div className="group relative h-10 w-10 rounded-full bg-bg-300 transition-all hover:scale-105">
          <div
            className={`absolute left-1/2 top-1/2 mx-auto h-5 w-[0.3rem] -translate-x-1/2 -translate-y-1/2 bg-slate-300 transition-all ${
              open ? "h-0" : ""
            }`}
          />
          <div className="absolute left-1/2 top-1/2 mx-auto h-[0.3rem] w-5 -translate-x-1/2 -translate-y-1/2 bg-slate-300" />
        </div>
      </label>
      {open && (
        <TsForm
          schema={createGoalSchema}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={onSubmit}
          defaultValues={{
            frequency: 1,
          }}
          formProps={{
            className:
              "flex flex-col gap-4 bg-bg-300 px-6 w-full py-4 rounded-lg",
          }}
          props={{
            content: {
              label: "Content",
            },
            frequency: {
              label: "Frequency",
              description:
                "How often do you want to do this (1 = Daily, 7 = Weekly, etc.)?",
            },
            description: {
              label: "Description",
              description: "What are you doing in this goal?",
            },
          }}
          renderAfter={() => (
            <Button type="submit" className="bg-bg-100">
              Create Goal
            </Button>
          )}
        />
      )}
    </div>
  );
};
