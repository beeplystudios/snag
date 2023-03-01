import { useInView } from "react-intersection-observer";

export const OnBottom: React.FC<
  React.PropsWithChildren<{ onBottom: () => void }>
> = ({ children, onBottom }) => {
  const { ref, inView } = useInView();

  if (inView) onBottom();

  return (
    <div>
      {children}
      <div ref={ref} className="h-[1px] w-[1px]" />
    </div>
  );
};
