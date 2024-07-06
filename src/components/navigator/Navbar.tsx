"use client"
import Link from "next/link";
import Button from '../Button';
import { handleLogout } from "@/lib/authentication";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from "next/navigation";
import { checkActiveRoute } from '@/lib/checkRoute';

const Navbar: React.FC = () => {
    const router = useRouter();
    const [activePath, setActivePath] = useState<string>("");
    const [isActiveNav, setIsActiveNav] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        const active = checkActiveRoute(pathname);
        setActivePath(active);
    }, [pathname]);

    const onLogout = () => {
        handleLogout({
            onSuccess: () => {
                localStorage.removeItem("portalToken");
                router.refresh();
                Swal.fire({
                    title: "Success!",
                    text: "Sign out successfully",
                    icon: "success",
                    showConfirmButton: true
                }).then(result => {
                    if(result.isConfirmed){
                        router.push('/auth/signin')
                    }
                });
            },
            onError: (err) => {
                Swal.fire({
                    title: "Error!",
                    text: `${err.response.data.message}`,
                    icon: "error",
                    showCancelButton: true
                });
            }
        })
    }

    return (
        <header className="w-full py-3 px-24 h-fit text-slate-900 bg-white shadow-sm flex justify-between items-center fixed top-0 font-['Quicksand'] z-50">
            <div className="logo">
                <h1 className="text-2xl font-semibold font-['Public Sans'] flex flex-row items-center gap-2"><i className="bi bi-controller block -rotate-12"></i>Gaming Portal</h1>
            </div>
            <nav className="w-fit">
                <i className={`bi ${isActiveNav ? "bi-x" : "bi-list-nested"} text-4xl lg:hidden cursor-pointer`} onClick={() => setIsActiveNav(prevState => !prevState)}></i>
                <ul className={`w-fit lg:w-full flex flex-col lg:flex-row gap-10 absolute right-5 border lg:border-none border-slate-300 rounded-md shadow-md lg:shadow-none py-5 px-10 lg:p-0 lg:static justify-center transition-all duration-300 ease-out bg-white items-center ${isActiveNav ? "opacity-100 top-12" : "top-8 pointer-events-none lg:pointer-events-auto opacity-0 lg:opacity-100"}`}>
                    {localStorage["portalToken"] ? (
                        <>
                            <li><Link className={`font-['Public Sans'] text-lg ${activePath !== "discover" ? "opacity-50" : ""}`} href={'/discover'}>Discover Games</Link></li>
                            <li><Link className={`font-['Public Sans'] text-lg ${activePath !== "manage-games" ? "opacity-50" : ""}`} href={'/manage-games'}>Manage Games</Link></li>
                            <li><Link className={`font-['Public Sans'] text-lg ${activePath !== "profile" ? "opacity-50" : ""}`} href={'/profile'}>Profile</Link></li>
                            <li><Button type="button" className="rounded-full px-5 font-normal flex items-center gap-2" handleClick={onLogout}><i className="bi bi-box-arrow-left"></i>Sign Out</Button></li>
                        </>
                    ) : (
                        <li className="flex flex-row items-center gap-3">
                            <Link className="font-['Public Sans'] text-sm py-2 px-4 border border-slate-900 rounded-full" href={'/auth/signin'}>Sign In</Link>
                            <Link className="font-['Public Sans'] text-sm py-2 px-4 bg-slate-900 rounded-full text-white" href={'/auth/signup'}>Sign Up</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;