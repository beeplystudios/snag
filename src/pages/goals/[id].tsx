/* eslint-disable @next/next/no-img-element */
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { QueryCell } from "@/components/shared/base-query-cell";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import useWindowSize from "@/utils/use-window-size";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Content: React.FC = () => {
  const router = useRouter();
  const goalQuery = api.goal.get.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );

  return (
    <QueryCell
      query={goalQuery}
      success={({ data }) => (
        <div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-medium">{data.content}</h1>
              <p className="text-slate-600">{data.description}</p>
            </div>
            <Button>{!!data.completedAt ? "Uncomplete" : "Complete"}</Button>
          </div>

          {data.messages.map((message) => (
            <div key={message.id} className="flex">
              <img
                src={message.sender.image || ""}
                alt={message.sender.name || ""}
              />
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      )}
    />
  );
};

const GoalDetails: NextPage = () => {
  const { isMobile, loading } = useWindowSize();

  if (loading) return null;

  if (isMobile) {
    return <Content />;
  }

  return (
    <DashboardLayout>
      <Content />
    </DashboardLayout>
  );
};

export default GoalDetails;
