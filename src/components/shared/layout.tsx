import { api } from "@/utils/api";
import { useEffect } from "react";
import { Header } from "./header";
import Navbar from "./navbar";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  const updateStreak = api.user.checkStreak.useMutation();
  const uncheckCompleted = api.goal.checkUncompleted.useMutation();

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

    if (!uncheckCompleted.data && !uncheckCompleted.isLoading) {
      uncheckCompleted
        .mutateAsync()
        .then(({ count }) => {
          console.log("uncompleted", count);
        })
        .catch(console.error);
    }
  }, [uncheckCompleted, updateStreak]);

  return (
    <div className="text-text-100 flex flex-col items-center m-">
      <Header title={title} />
      <Navbar />
      <main className="w-screen py-8 px-4 md:px-20">
        {/* Couldn't make it center, off-center as a style? */}
        <div className="lg:ml-[10%] lg:mr-[40%]"> 
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
