/* eslint-disable @next/next/no-img-element */
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { QueryCell } from "@/components/shared/base-query-cell";
import Layout from "@/components/shared/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import useWindowSize from "@/utils/use-window-size";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Content: React.FC = () => {
  const router = useRouter();
  const context = api.useContext();
  const goalQuery = api.goal.get.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );
  const [checked, setChecked] = useState(goalQuery.data?.completedAt !== null);
  const onComplete = api.goal.complete.useMutation({
    onSuccess() {
      context.goal.invalidate().catch((e) => console.error(e));
    },
  });
  const onUnComplete = api.goal.uncomplete.useMutation({
    onSuccess() {
      context.goal.invalidate().catch((e) => console.error(e));
    },
  });

  // if(sessionData?.user.id !== goalQuery)

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
            <Button
              onClick={() => {
                if (!goalQuery.data) return;
                const newVal = !checked;
                setChecked(newVal);
                if (newVal) {
                  void onComplete.mutateAsync({
                    id: goalQuery.data.id,
                    userId: goalQuery.data.authorId,
                  });
                } else {
                  void onUnComplete.mutateAsync({
                    id: goalQuery.data.id,
                    userId: goalQuery.data.authorId,
                  });
                }
              }}
            >
              {!!data.completedAt ? "Uncomplete" : "Complete"}
            </Button>
          </div>
          <hr />
          <p className="text-xl font-medium">Activity</p>
          {data.messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center gap-2 rounded-md bg-slate-200 p-2"
            >
              <Avatar>
                <AvatarImage
                  src={message.sender.image || ""}
                  alt={message.sender.name || ""}
                />
                <AvatarFallback>
                  {message.sender.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>{message.message}</p>
              <div className="flex gap-2">
                <p className="text-neutral-600">+{message.points}</p>
                <Image
                  src="/Snag coin.svg"
                  width={20}
                  height={10}
                  alt="coins"
                />
              </div>
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
    return (
      <Layout>
        <div className="w-full">
          <Content />
        </div>
      </Layout>
    );
  }

  return (
    <DashboardLayout>
      <Content />
    </DashboardLayout>
  );
};

export default GoalDetails;
