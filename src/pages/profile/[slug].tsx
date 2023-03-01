import { useRouter } from "next/router";
import Layout from "@/components/shared/layout";
import { api } from "@/utils/api";
import Goal from "@/components/goals/goal";
import { useSession } from "next-auth/react";
import { GoalWithMotivate } from "@/components/goals/goal-with-motivate";

const ProfilePage: React.FC = () => {
  const session = useSession({ required: true });
  const router = useRouter();

  const isMe = session.data?.user.slug === router.query.slug;

  const willQueryProfile = !!router.query.slug && !isMe;

  const userQuery = api.user.getBySlug.useQuery(
    { slug: router.query.slug as string },
    { enabled: willQueryProfile }
  );
  const userGoalsQuery = api.goal.getFromSlug.useQuery(
    { slug: router.query.slug as string },
    { enabled: willQueryProfile }
  );
  const myGoalsQuery = api.goal.getMine.useQuery(undefined, { enabled: isMe });

  const user = isMe ? session.data?.user : userQuery.data;

  return (
    <Layout title={user?.name ?? ""}>
      <div className="w-full max-w-6xl">
        <h1 className="my-4 w-full text-center text-3xl font-bold">
          {user?.name}
        </h1>

        <div className="flex flex-col gap-2">
          {isMe &&
            myGoalsQuery.data?.map((goal, i) => <Goal goal={goal} key={i} />)}

          {!isMe &&
            userGoalsQuery.data?.map((goal, i) => (
              <GoalWithMotivate goal={goal} key={i} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
