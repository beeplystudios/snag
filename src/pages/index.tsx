import { CreateGoal } from "@/components/goals/create";
import Goal from "@/components/goals/goal";
import Layout from "@/components/shared/layout";
import { api } from "@/utils/api";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const goalsQuery = api.goal.getMine.useQuery();

  return (
    <Layout>
      <CreateGoal />

      {goalsQuery.data?.map((goal, i) => (
        <Goal goal={goal} key={i} />
      ))}
    </Layout>
  );
};

export default Home;
