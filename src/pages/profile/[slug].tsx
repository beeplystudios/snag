import { useRouter } from "next/router";
import Layout from "@/components/shared/layout";
import { api } from "@/utils/api";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  const userQuery = api.user.findUnique.useQuery({ slug });
  const userGoalsQuery = api.goal.getFromSlug.useQuery({ slug });
  const user = userQuery.data;

  return (
    <Layout title={user?.name ?? ""}>
      <h1 className="w-full text-left text-center">{user?.name}</h1>

      {userGoalsQuery.data?.map((e) => 
        <div>{e.content}</div>
      )}
    </Layout>
  );
};

export default ProfilePage;
