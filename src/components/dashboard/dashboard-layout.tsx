import { api } from "@/utils/api";
import useWindowSize from "@/utils/use-window-size";
import { useSession } from "next-auth/react";
import React from "react";
import { CreateGoal } from "../goals/create-goal";
import Goal from "../goals/goal";
import { QueryCell } from "../shared/base-query-cell";
import Layout from "../shared/layout";

export const DashboardLayout: React.FC<React.PropsWithChildren> = (props) => {
  const { status } = useSession();
  const goalsQuery = api.goal.getMine.useQuery(undefined, {
    enabled: status === "authenticated",
  });
  const { isMobile, loading } = useWindowSize();

  if (loading) return null;

  if (isMobile) {
    return (
      <Layout>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">Goals</h1>
            <CreateGoal />
          </div>
          <div className="flex w-full gap-8">
            <QueryCell
              query={goalsQuery}
              success={({ data }) => (
                <div className="flex w-full flex-col gap-4">
                  {data.map((goal) => (
                    <Goal goal={goal} key={goal.id} />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">Goals</h1>
            <CreateGoal />
          </div>
          <div className="flex w-full gap-8">
            <div className="flex-1">
              <QueryCell
                query={goalsQuery}
                success={({ data }) => (
                  <div className="flex flex-col gap-4">
                    {data.map((goal) => (
                      <Goal
                        goal={goal}
                        checked={!!goal.completedAt}
                        key={goal.id}
                      />
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="flex-1">{props.children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
