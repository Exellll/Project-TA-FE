interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StudentContainer: React.FC<ContainerProps> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <div
      className={`bg-[#FCFCFC] min-h-screen w-full pt-[24px] overflow-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default StudentContainer;
