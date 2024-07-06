interface PaginateProps{
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    pageTotal: number
}

export default function PaginateNavigator({ page, setPage, pageTotal } : PaginateProps){
    return (
        <nav aria-label="..." className='w-fit h-fit flex flex-row gap-3 items-center justify-between cursor-pointer'>
            <span onClick={() => setPage(prevState  => prevState - 1 === 0 ? prevState : prevState - 1)} className="py-2 px-4 bg-white border border-slate-900 text-slate-900 rounded-md">{"<<"} Prev</span>
            <ul className="pagination flex flex-row items-center border border-slate-900 rounded-md overflow-hidden">
                {[...Array(pageTotal)].map((_, i) => (
                    <li onClick={() => setPage(i)} className={`py-2 px-4 ${page === i ? "text-white bg-slate-900" : "text-slate-900 bg-white"}`} key={i}>{i + 1}</li>
                ))}
            </ul>
            <span onClick={() => setPage(prevState  => prevState + 1 === pageTotal ? prevState : prevState + 1)} className="py-2 px-4 bg-white border border-slate-900 text-slate-900 rounded-md">Next {">>"}</span>
        </nav>
    )
}