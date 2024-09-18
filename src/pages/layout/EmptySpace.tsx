type EmptySpaceProps = {
  children: React.ReactNode;
};

const EmptySpace = ({ children }: EmptySpaceProps) => {
  return (
    <div className="h-full flex-1 rounded-[10px] lg:rounded-l-[0]  dark:bg-[#171717]">
      {children}
    </div>
  );
};

export default EmptySpace;
