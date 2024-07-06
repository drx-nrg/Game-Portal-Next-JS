import InputField from '../InputField'
import Button from '../Button'

import Link from 'next/link';

export default function Form({ handleSubmit, onHandleChange, isFlipped, isSignInPage } : { handleSubmit: any, onHandleChange: any, isFlipped: boolean, isSignInPage: boolean }){
    return (
        <form onSubmit={handleSubmit} className="signin-card bg-white rounded-md flex-1 min-h-fit flex flex-col gap-5 items-center px-5 py-8 relative z-20" id={isFlipped ? "flipOrder1" : "flipOrder2"} style={{ fontFamily: "Poppins, sans-serif" }}>
            <div className="header-card w-full flex flex-col items-center">
                <h1 className="text-slate-900 font-bold text-3xl mb-1 font-['Poppins']">Welcome!</h1>
                <p className="text-slate-600 text-sm mb-3 font-['Poppins']">Sign In or Sign Up to Game Portal Platform</p>
            </div>
            <div className="fields w-full">
                <InputField type="text" hasIcon="bi-person-circle" name="username" handleChange={onHandleChange} />
                <InputField type="password" hasIcon="bi-shield-lock" name="password" handleChange={onHandleChange} />
            </div>
            <Button type='submit' className='bg-blue-700 w-full mt-5' handleChange={() => { null }}>{isSignInPage ? "Sign In" : "Sign Up"}</Button>
            <p>{isSignInPage ? "Don't" : "Already"} have an account ? <Link href={`/auth/${isSignInPage ? "signup" : "signin"}`} className='text-blue-500'>{isSignInPage ? "Sign Up" : "Sign In"}</Link></p>
        </form>
    )
}