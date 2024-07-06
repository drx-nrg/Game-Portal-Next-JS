"use client"
import Image from 'next/image';
import { useFetchData, useFetch } from '@/hooks/use';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import Button from '../Button'
import Skeleton from '../Skeleton'
import Breadcrumbs from '../navigator/Breadcrumbs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import GameCard from './GameCard';
import PaginateNavigator from '../navigator/Pagination';

export interface Game {
    slug: string,
    title: string,
    description: string,
    thumbnail: string,
    uploadTimestamp: string,
    author: string,
    scoreCount: number,
    gamePath: string,
    image: string
}

export default function GameCollection() {
    const [gameData, setGameData] = useState<any>(null);
    const [sortBy, setSortBy] = useState<string>("title");
    const [sortDir, setSortDir] = useState<string>("asc");
    const [page, setPage] = useState<number>(0);
    const [pageTotal, setPageTotal] = useState<number>(0);
    const searchParams = useSearchParams();
    const [search, setSearch] = useState<any>(searchParams.get("search"));

    // const { data, isLoading, isError, error } = useFetchData({
    //     queryKey: "games", 
    //     uri: "games", 
    //     contentType: "application/json", 
    //     authToken: localStorage["portalToken"] 
    // });

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        useFetch({
            method: "index",
            uri: `games?page=${page}&size=${10}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search ? search : ""}`,
            id: 0,
            authToken: localStorage["portalToken"],
            callback: setGameData,
            onUnauthorized: () => {
                Swal.fire({
                    title: "Error!",
                    text: "Session token has expired",
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: true
                }).then(result => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("portalToken");
                        router.push('/auth/signin');
                    }
                })
            },
            onError: (error) => {
                console.log(error);
            }
        });
    }, [sortBy, sortDir, page, search]);
    
    console.log(search)
    
    useEffect(() => {
        setPageTotal((prevState) => {
            if(gameData?.totalElements){
                return Math.ceil(gameData.totalElements / 10);
            }

            return prevState;
        });
    }, [gameData]);

    const handleSearch = () => {
        router.push(`/discover?search=${search}`);
    }

    return (
        <>
            <div className="top-bar w-full px-24 grid lg:grid-cols-3 sm:grid-cols-1 items-center mb-5 gap-5">
                <div className="left-bar flex-1">
                    <Breadcrumbs path={pathname} />
                    <h1 className="text-3xl font-semibold font-['Montserrat']">Discover Games</h1>
                    <p className="text-slate-600 mb-5">Discover all the game</p>
                </div>
                <div className="middle-bar flex-1 flex flex-row items-center gap-3">
                    <Button type="button" handleClick={() => setSortDir(prev => prev === "asc" ? "desc" : "asc")}><i className={`bi ${sortDir === "asc" ? "bi-sort-alpha-down" : "bi-sort-alpha-up"}`}></i></Button>
                    <select name="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="outline-none border border-slate-300 rounded-md p-2 text-slate-900">
                        <option value={"title"}>Title {sortDir === "asc" ? "( ASC )" : "( DESC )"}</option>
                        <option value={"uploaddate"}>Upload Date {sortDir === "asc" ? "( ASC )" : "( DESC )"}</option>
                        <option value={"popular"}>Popularity (Scores) {sortDir === "asc" ? "( ASC )" : "( DESC )"}</option>
                    </select>
                </div>
                <div className="right-bar flex-1 flex flex-row items-center gap-3">
                    <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Enter Search' name="search" className="outline-none w-full flex-1 rounded-md text-slate-900 bg-white border border-slate-300 p-3" />
                    <Button handleClick={handleSearch} type="button"><i className="bi bi-search"></i></Button>
                </div>
            </div>
            <div className="w-full px-24 h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 lg:gap-10 mb-10">
                {gameData ? gameData.content?.map((game: Game, index: number) => (
                    <GameCard game={game} key={index} />
                )) : [...Array(6)].map((_, i) => {
                    return <Skeleton />
                })}
            </div>
            <PaginateNavigator page={page} setPage={setPage} pageTotal={pageTotal} />
        </>
    );
}