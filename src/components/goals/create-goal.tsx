import { createGoalSchema } from "@/shared/schemas";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TsForm } from "../ui/forms/ts-form";

export const CreateGoal: React.FC = () => {
  const createGoal = api.goal.create.useMutation();
  const trpcContext = api.useContext();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof createGoalSchema>) => {
    await createGoal.mutateAsync(values);
    await trpcContext.goal.getMine.invalidate();

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Goal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Goal</DialogTitle>
          <DialogDescription>
            A goal is something you want to achieve, but for the best efficacy,
            goals should be simple and realistic.{" "}
            <a
              href="https://www.ucop.edu/local-human-resources/_files/performance-appraisal/How%20to%20write%20SMART%20Goals%20v2.pdf"
              className="underline"
            >
              Click here to learn more about how to set smart goals.
            </a>
          </DialogDescription>
        </DialogHeader>
        <TsForm
          schema={createGoalSchema}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={onSubmit}
          defaultValues={{
            frequency: 1,
          }}
          formProps={{
            className: "flex flex-col gap-3",
          }}
          props={{
            content: {
              label: "Content",
              description: "What is the goal?",
            },
            frequency: {
              label: "Frequency",
              description:
                "How often do you want to do this (1 = Daily, 7 = Weekly, etc.)?",
            },
            description: {
              label: "Description",
              description: "How do you achieve this goal?",
            },
          }}
          renderAfter={() => (
            <Button type="submit" className="w-full">
              Create Goal
            </Button>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
