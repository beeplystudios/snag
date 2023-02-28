import { CreateGoal } from "@/components/goals/create";
import Goal from "@/components/goals/goal";
import Layout from "@/components/shared/layout";
import Button from "@/components/ui/button";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { status } = useSession();
  const goalsQuery = api.goal.getMine.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  if (status !== "authenticated")
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {status === "loading" && <p>Logging you in..</p>}
        {status === "unauthenticated" && (
          <div>
            <p>insert landing page here</p>
            <Button onClick={() => void signIn("google")}>Sign in</Button>
          </div>
        )}
      </div>
    );

  return (
    <Layout>
      <h1>My Goals</h1>

      <CreateGoal />

      {goalsQuery.data?.map((goal, i) => (
        <Goal goal={goal} key={i} />
      ))}
    </Layout>
  );
};

export default Home;
