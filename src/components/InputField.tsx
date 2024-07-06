import React, { ChangeEventHandler } from "react"

type InputField = {
    type: "text" | "password"
    children?: React.ReactNode,
    hasIcon: string | null,
    name: string,
    className?: string | null,
    handleChange?: ChangeEventHandler<HTMLInputElement>
}

const InputField: React.FC<InputField> = ({ type, children, hasIcon, name, className, handleChange }) => {
    return (
        <div className={`input-field w-full py-2 border border-slate-300 rounded-md flex flex-row gap-2 px-3 mb-3 ${className}`}>
            {hasIcon && <i className={`bi ${hasIcon} opacity-50`}></i>}
            <input type={type} name={name} id={name} placeholder={`Enter ${name}`} className='flex-1 outline-none' onChange={handleChange} />
        </div>
    )
}

export default InputField