export const SVGIcon = ({
  svg,
  className,
  normalWidth = true,
}: {
  svg: string;
  className: string;
  normalWidth?: boolean;
}) => {
  return (
    <div
      className={`${className} ${normalWidth ? "w-6 h-6" : ""}`}
      style={{
        maskImage: `url(${svg})`,
        WebkitMaskImage: `url(${svg})`,
        maskSize: "90%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
};
