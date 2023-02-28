import { api, type RouterOutputs } from "@/utils/api";
import clsx from "clsx";
import { useState } from "react";

type GoalWithMessages = RouterOutputs["goal"]["getMine"] extends (infer T)[]
  ? T
  : never;

const Goal: React.FC<{
  goal: GoalWithMessages;
  changable?: boolean;
}> = ({ goal, changable = true }) => {
  const [checked, setChecked] = useState(goal.completedAt !== null);
  const context = api.useContext();
  const onComplete = api.goal.complete.useMutation({
    onSuccess() {
      context.invalidate().catch((e) => console.error(e));
    },
  });
  const onUnComplete = api.goal.uncomplete.useMutation({
    onSuccess() {
      context.invalidate().catch((e) => console.error(e));
    },
  });

  return (
    <div
      className={`flex w-1/4 items-center justify-evenly rounded border-2 py-2 px-4 ${
        checked
          ? "border-green-500 bg-emerald-600/30"
          : "border-rose-400 bg-rose-600/30"
      }`}
    >
      <div className="flex flex-1 flex-col items-start">
        <h3 className="text-lg font-bold">{goal.content}</h3>
        <p className="text-white/80">{goal.description ?? <br />}</p>

        <p className="mt-2">Motivating messages down here</p>

        <div>
          {goal.messages.length === 0 && <p>None!</p>}
          {goal.messages.map((message) => (
            <p key={message.id}>
              {message.sender.name} said: {message.message}, given:{" "}
              {message.points}pts
            </p>
          ))}
        </div>
      </div>
      <label>
        <input
          type="checkbox"
          name={`goalbox-${goal.id}`}
          checked={checked}
          onChange={(e) => {
            if (!changable) return;
            setChecked(e.target.checked);

            if (e.target.checked) {
              void onComplete.mutateAsync({
                id: goal.id,
                userId: goal.authorId,
              });
            } else {
              void onUnComplete.mutateAsync({
                id: goal.id,
                userId: goal.authorId,
              });
            }
          }}
          className="peer absolute opacity-0"
        />
        <div
          className={clsx(
            "h-10 w-10 cursor-pointer rounded border-2",
            checked ? "border-green-500 bg-green-500" : "border-rose-400 "
          )}
        />
      </label>
    </div>
  );
};

export default Goal;
