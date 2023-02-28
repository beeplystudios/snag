import { useRouter } from "next/router";
import Layout from "@/components/shared/layout";
import { api } from "@/utils/api";
import Goal from "@/components/goals/goal";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  const userQuery = api.user.findUnique.useQuery({ slug });
  const userGoalsQuery = api.goal.getFromSlug.useQuery({ slug });
  const user = userQuery.data;

  return (
    <Layout title={user?.name ?? ""}>
      <h1 className="my-4 w-full text-center text-3xl font-bold">
        {user?.name}
      </h1>

      {userGoalsQuery.data?.map((goal, i) => (
        <Goal goal={goal} key={i} changable={false} />
      ))}
    </Layout>
  );
};

export default ProfilePage;
