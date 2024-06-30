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
    const baseClasses = "bg-orange-500 rounded-full py-8 px-8 font-bold uppercase text-5xl w-full text-center flex items-center justify-center";
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
