import { Link } from "react-router-dom"

type ActionButtonProps = {
    url?: string,
    type?: "submit" | "reset" | "button",
    text: string,
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
    size?: 'small' | 'large',
}

export function ActionButton({ url, type, text, onClick, className, disabled, size = 'large' }: ActionButtonProps) {
    const baseClasses = "bg-orange-500 rounded-full font-bold uppercase text-5xl text-center w-full flex items-center justify-center";
    const sizeClasses = size === 'large' ? "p-8" : "p-4";
    const combinedClasses = `${baseClasses} ${sizeClasses} ${className ?? ''}`;

    return (
        url ? (
            <Link
                to={url}
                className={combinedClasses}
                onClick={onClick}
            >
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
        )
    )
}
