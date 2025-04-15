export function MainTitle({
    text,
    size = "small"
  }: {
    text?: string,
    uppercase?: boolean,
    size?: "small" | "large"
  }) {
    const sizeClass = size === "large" ? "text-5xl sm:text-7xl" : "text-6xl sm:text-5xl";
    
    return (
      <h1 className={`text-center font-bold playfair-display-400 ${sizeClass}`}>
        {text}
      </h1>
    );
  }