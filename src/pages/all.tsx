import Goal from "@/components/goals/goal";
import { GoalWithMotivate } from "@/components/goals/goal-with-motivate";
import Layout from "@/components/shared/layout";
import { api } from "@/utils/api";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const All: NextPage = () => {
  const session = useSession({ required: true });
  const allGoalsQuery = api.goal.getAll.useInfiniteQuery(
    {
      notBy: session.data?.user.id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: session.status === "authenticated",
    }
  );

  const goals = allGoalsQuery.data?.pages.map((page) => page.goals).flat();

  return (
    <Layout>
      <div className="mt-4 flex flex-col gap-2">
        {goals?.map((goal) => (
          <GoalWithMotivate key={goal.id} goal={goal} />
        ))}
      </div>
    </Layout>
  );
};

export default All;
