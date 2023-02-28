import { Header } from "./header";
import Navbar from "./navbar";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  return (
    <main className="text-text-100 flex min-h-screen flex-col items-center bg-bg-100">
      <Header title={title} />
      <Navbar />
      <div className="flex h-full w-full flex-1 flex-col items-center">
        {children}
      </div>
    </main>
  );
};

export default Layout;
