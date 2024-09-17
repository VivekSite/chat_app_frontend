import EmptySpace from "./EmptySpace";
import PrimarySideBar from "./PrimarySideBar";
import SecondarySideBar from "./SecondarySideBar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen p-[1rem] lg:p-[2rem]">
      <PrimarySideBar />
      <SecondarySideBar />
      <EmptySpace>{children}</EmptySpace>
    </div>
  );
};

export default Layout;
