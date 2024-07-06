import Link from "next/link";

export default function GameCard({ game } : any){
    return (
        <div className="game-card w-full flex-1">
            <div className="card max-w-[450px] h-[500px] bg-white rounded-md overflow-hidden shadow-md max-h-fit">
                <div className="image-container w-full h-[60%] overflow-hidden relative" id="onHoverShiny">
                    <div className="absolute w-[10%] h-full top-0 -left-12 transition-all ease duration-300" id="onHoverShinyEl" style={{background: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3))"}}></div>
                    <img src={game.image ? game.image : '/thumbnail.png'} alt={game.title} className="w-full h-full object-cover" />
                </div>
                <div className="main-text p-5 h-[40%] flex flex-col justify-between">
                    <div className="content">
                        <h1 className="text-2xl md:text-xl lg:text-2xl font-semibold mb-1 font-['Inter']">{game.title}</h1>
                        <p className="text-slate-600 md:text-sm lg:text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, asperiores?</p>
                    </div>
                    <Link href="games" className='text-blue-600 mt-3 block jiggle-elem'>More Information {">>"}</Link>
                </div>
            </div>
        </div>
    )
}