import { CreateGoal } from "@/components/goals/create-goal";
import Goal from "@/components/goals/goal";
import { Inbox } from "@/components/goals/inbox";
import Layout from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { status, data: session } = useSession();
  const goalsQuery = api.goal.getMine.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  if (status !== "authenticated")
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {status === "loading" && <p>Logging you in..</p>}
        {status === "unauthenticated" && (
          <div className="w-96 text-center">
            <h1 className="text-5xl font-bold">SNAG</h1>
            <p>insert mission here</p>
            <Button onClick={() => void signIn("google")} className="mt-4 w-32">
              Sign in
            </Button>
          </div>
        )}
      </div>
    );

  return (
    <Layout>
      <h1>My Goals</h1>

      <p>
        Points: {session.user.points}, streak: {session.user.streak}
      </p>

      <Inbox />

      <CreateGoal />

      {goalsQuery.data?.map((goal, i) => (
        <Goal goal={goal} key={i} />
      ))}
    </Layout>
  );
};

export default Home;
