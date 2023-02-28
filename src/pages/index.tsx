import { CreateGoal } from "@/components/goals/create";
import Layout from "@/components/shared/layout";
import { api } from "@/utils/api";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const goalsQuery = api.goal.getMine.useQuery();

  return (
    <Layout>
      <CreateGoal />

      {goalsQuery.data?.map((goal) => (
        <div key={goal.id}>
          <h1>content: {goal.content}</h1>
          <p>description: {goal.description}</p>
          <p>frequency: {goal.frequency}</p>
        </div>
      ))}
    </Layout>
  );
};

export default Home;
