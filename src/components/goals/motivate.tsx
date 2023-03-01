import { sendMotivationSchema } from "@/shared/schemas";
import { api } from "@/utils/api";
import { useState } from "react";
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
import { GoalWithAuthor } from "./goal-with-motivate";

export const MotivateModal: React.FC<{ goal: GoalWithAuthor }> = (props) => {
  const [buttonConfirmed, setButtonConfirmed] = useState(false);
  const motivate = api.goal.motivate.useMutation({
    onSuccess() {
      setButtonConfirmed(true);

      setTimeout(() => {
        setButtonConfirmed(false);
      }, 2500);
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof sendMotivationSchema>) => {
    await motivate.mutateAsync({
      goalId: props.goal.id,
      ...values,
    });

    // cause next auth to refetch the points
    document.dispatchEvent(new Event("visibilitychange"));

    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Motivate</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Motivate {props.goal.author.name}</DialogTitle>
          <DialogDescription>
            Send some motivation to {props.goal.author.name} to inspire them to
            achieve their goal!
          </DialogDescription>
        </DialogHeader>
        <TsForm
          schema={sendMotivationSchema}
          defaultValues={{
            points: 1,
          }}
          props={{
            message: {
              label: "Message",
              description: `Write a nice message to ${
                props.goal.author.name || ""
              }!`,
            },
            points: {
              label: "Points",
              description:
                "Send some motivation points as your token of inspiration",
            },
          }}
          formProps={{ className: "w-full flex gap-2 flex-col" }}
          onSubmit={(values) => void onSubmit(values)}
          renderAfter={() => (
            <Button className="mt-3 w-full" disabled={motivate.isLoading}>
              {buttonConfirmed ? "Motivation Sent!" : "Motivate"}
            </Button>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
