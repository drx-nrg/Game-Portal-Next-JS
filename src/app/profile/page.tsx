"use client"
import { useFetch } from '@/hooks/use';
import { handleUnauthorizedUser } from '@/lib/authentication';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Skeleton from '@/components/Skeleton';
import GameCard from '@/components/games/GameCard';

interface Game{
    slug: string,
    title: string,
    description: string,
    image: string
}

interface Score{
    game: any,
    score: string,
    timestamp: string
}

interface User{
    username: string,
    registeredTimestamp: "string",
    authoredGames: Game[],
    highscores: Score[]
}

export default function Profile(){
    const [user, setUser] = useState<User>();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        useFetch({
            method: "GET",
            uri: `users`,
            id: localStorage["username"],
            callback: setUser,
            onUnauthorized: () => handleUnauthorizedUser(router),
            onError: (err) => {
                console.log(err)
            }
        });
    }, []);

    return (
        <section id="profile" className='pt-24'>
            <div className="container min-w-full px-24">
                {/* <PageHeader title="Profile" subtitle="Information about your account profile" pathname={pathname} /> */}
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <img src="/thumbnail.png" className="rounded-full w-[250px]" />
                    <div className="profile-detail text-center">
                        <h1 className="font-semibold text-4xl font-['Montserrat'] mb-3">{user?.username}</h1>
                        <p className="text-slate-600 text-xl">Joined at</p>
                        <p className="text-slate-600 text-xl">{user?.registeredTimestamp.split("T")[0]}</p>
                    </div>
                    <div className="w-full mt-5">
                        <PageHeader title="Authored Games" subtitle={`Game authored by ${user?.username}`} pathname={""} withBreadcrumbs={false} />
                        <div className="grid grid-cols-3 gap-10">
                            {(user && user?.authoredGames?.length !== 0) ? user?.authoredGames?.map((game: Game, index: number) => (
                                <GameCard game={game} key={index} />
                            )) : (
                                [...Array(3)].map((_, i) => (
                                    <Skeleton key={i} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    );
}