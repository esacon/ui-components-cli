interface ImageProps {
    height?: number;
    width?: number;
    alt?: string;
    src: string;
    className?: string;
}

export function Image({
    src,
    width = 150,
    height = 150,
    alt = "Image",
    className,
}: ImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    );
}
