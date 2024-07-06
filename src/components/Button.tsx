import React from 'react'

type ButtonProps = {
    type: "submit" | "reset" | "button",
    className?: string,
    children?: any,
    handleClick: () => void
}

const Button: React.FC<ButtonProps> = ({ type, className, children, handleClick }) => {
    return (
        <button type={type} className={`px-3 py-2 min-h-fit text-white bg-black rounded-md font-semibold ${className}`} onClick={handleClick}>{children}</button>
    )
}

export default Button