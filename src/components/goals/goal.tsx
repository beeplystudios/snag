import { api } from "@/utils/api";
import { Goal } from "@prisma/client";
import { useState } from "react";

const Goal: React.FC<{ goal: Goal; changable?: boolean }> = ({
  goal,
  changable = true,
}) => {
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
        <p className="text-white/80">{goal.description}</p>
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
          className={`h-10 w-10  rounded border-2 ${
            checked ? "border-green-500 bg-green-500" : "border-rose-400 "
          }`}
        />
      </label>
    </div>
  );
};

export default Goal;
