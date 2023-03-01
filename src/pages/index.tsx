import { GoalWithMotivate } from "@/components/goals/goal-with-motivate";
import Layout from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import { OnBottom } from "@/components/ui/on-bottom";
import { api } from "@/utils/api";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Index: NextPage = () => {
  const session = useSession();
  const allGoalsQuery = api.goal.getAll.useInfiniteQuery(
    {
      notBy: session.data?.user.id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: session.status === "authenticated",
    }
  );

  if (session.status === "loading") return null;

  if (session.status === "unauthenticated") {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
        <Image src="/logo.svg" alt="" width={192} height={192} />

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold">Welcome to Snag</h1>
          <p className="text-xl text-slate-700">
            Log in to start achieving your goals.
          </p>
        </div>

        <Button onClick={() => void signIn("google")} size="lg">
          Continue with Google
        </Button>

        <p className="max-w-sm text-center text-sm text-slate-600">
          Made with love by{" "}
          <a href="https://santiagovira.tech" className="underline">
            <span className="font-medium text-slate-800">S</span>antiago Vira
          </a>
          ,{" "}
          <a href="https://nirjhor.dev" className="underline">
            <span className="font-medium text-slate-800">N</span>irjhor Nath
          </a>
          ,{" "}
          <a href="https://github.com/AwareErmine" className="underline">
            <span className="font-medium text-slate-800">A</span>ramie Ewen
          </a>{" "}
          and{" "}
          <a href="https://github.com/giilbert" className="underline">
            <span className="font-medium text-slate-800">G</span>ilbert Zhang
          </a>{" "}
          for BTHS Engineers Week 2023.
        </p>
      </div>
    );
  }

  const goals = allGoalsQuery.data?.pages.map((page) => page.goals).flat();

  return (
    <Layout>
      <div className="mt-4 flex w-full max-w-6xl flex-col gap-2">
        <OnBottom onBottom={() => void allGoalsQuery.fetchNextPage()}>
          <div className="flex flex-col gap-4">
            {goals?.map((goal) => (
              <GoalWithMotivate key={goal.id} goal={goal} />
            ))}
          </div>

          <p className="mt-3 text-center text-neutral-900/80">
            {allGoalsQuery.hasNextPage
              ? "Fetching more goals.."
              : "No more goals.."}
          </p>
        </OnBottom>
      </div>
    </Layout>
  );
};

export default Index;
