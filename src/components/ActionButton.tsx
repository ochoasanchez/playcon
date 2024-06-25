import { Link } from "react-router-dom"

type ActionButtonProps = {
    url?: string,
    type?: "submit" | "reset" | "button",
    text: string,
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
}

export function ActionButton({ url, type, text, onClick, className, disabled }: ActionButtonProps) {
    const baseClasses = "bg-orange-500 rounded-full py-4 px-8 font-bold uppercase mt-4 text-2xl";
    const combinedClasses = `${baseClasses} ${className ?? ''}`;

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
