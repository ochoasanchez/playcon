import { Link } from "react-router-dom";

type ActionButtonProps = {
  url?: string;
  type?: "submit" | "reset" | "button";
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: "small" | "large";
  fullWidth?: boolean;
  variant?: "main" | "alternate" | "transparent"; // New variant prop
};

export function ActionButton({
  url,
  type,
  text,
  onClick,
  className,
  disabled,
  size = "large",
  fullWidth = true,
  variant = "main", // Default to "main"
}: ActionButtonProps) {
  // Base classes that don't change
  const baseClasses = "rounded-full font-bold uppercase text-2xl sm:text-4xl text-center flex items-center justify-center";
  
  // Variant-specific classes
  const variantClasses = {
    main: "bg-emerald-200 text-emerald-700",
    alternate: "bg-white text-emerald-600",
    transparent: "bg-transparent text-white",
  };
  
  const sizeClasses = size === "large" ? "p-4 sm:p-6" : "p-4";
  const widthClasses = fullWidth ? "w-full" : "w-fit";
  
  // Combine all classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${className ?? ""} ${widthClasses}`;

  return url ? (
    <Link to={url} className={combinedClasses} onClick={onClick}>
      {text}
    </Link>
  ) : (
    <button
      className={combinedClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}