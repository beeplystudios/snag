import { api } from "@/utils/api";
import { useEffect } from "react";
import { Header } from "./header";
import Navbar from "./navbar";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  const updateStreak = api.user.checkStreak.useMutation();

  useEffect(() => {
    if (!updateStreak.data && !updateStreak.isLoading) {
      updateStreak
        .mutateAsync()
        .then(({ giveStreakPoints }) => {
          if (giveStreakPoints) {
            console.log("Streak updated");
          }
        })
        .catch(console.error);
    }
  }, [updateStreak]);

  return (
    <div className="text-text-100 flex min-h-screen flex-col items-center">
      <Header title={title} />
      <Navbar />
      <main className="flex h-full w-full flex-1 flex-col items-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
