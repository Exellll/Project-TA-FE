import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  placeholderSrc,
  resizeMode,
  className,
}: {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  placeholderSrc: string;
  resizeMode?: "cover" | "fill" | "contain";
  className?: string;
}) => {
  return (
    <LazyLoadImage
      className={className}
      alt={alt}
      src={src}
      effect="blur"
      placeholderSrc={placeholderSrc}
      width={width ? width : ""}
      height={height ? height : ""}
      style={{ objectFit: resizeMode }}
    />
  );
};

export default OptimizedImage;
