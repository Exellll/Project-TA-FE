interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <div
      className={`bg-[#FCFCFC] max-h-screen h-screen overflow-auto w-[80%] lg:pt-[100px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
