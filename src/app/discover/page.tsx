import GameCollection from '@/components/games/GameCollection';

export default async function Discover(){
    return (
        <section id="discover-games" className='pt-20'>
            <div className="container min-w-full h-fit mb-5 flex flex-col items-center">
                <GameCollection/>
            </div>
        </section>
    )
}