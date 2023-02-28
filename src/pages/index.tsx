import { CreateGoal } from "@/components/goals/create";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  const goalsQuery = api.goal.getMine.useQuery();

  return (
    <div>
      <button onClick={() => signIn("google")}>Sign in</button>

      <CreateGoal />

      {goalsQuery.data?.map((goal) => (
        <div key={goal.id}>
          <h1>content: {goal.content}</h1>
          <p>description: {goal.description}</p>
          <p>frequency: {goal.frequency}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
