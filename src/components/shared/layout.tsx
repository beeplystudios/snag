import { Header } from "./header";
import Navbar from "./navbar";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
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
