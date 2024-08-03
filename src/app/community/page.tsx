"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function CommunityTab(){
    const [isOpening, setIsOpening] = useState<boolean>(true);
    const [isTextAppear, setIsTextAppear] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        AOS.init();
        setTimeout(() => {
            setIsTextAppear(false);
            setTimeout(() => setIsOpening(false), 400);
        }, 1600)
    }, []);

    if(isOpening){
        return (
            <div className="container w-full h-screen flex flex-col justify-center items-center">
                <h1 className={`text-4xl font-semibold mb-3 transition-all duration-300 ${isTextAppear ? "opacity-100" : "opacity-0"}`} data-aos="fade-right" data-aos-duration="600">Welcome to community tab!</h1>
                <h2 className={`text-lg text-slate-600 transition-all duration-300 ${isTextAppear ? "opacity-100" : "opacity-0"}`} data-aos="fade-left" data-aos-duration="600">Chat and meet another player around the world!</h2>
            </div>
        )
    }else{
        return (
            <div className="container w-full h-screen flex flex-col justify-center items-center">
                <h1>Hello World!</h1>
            </div>
        )
    }   
}