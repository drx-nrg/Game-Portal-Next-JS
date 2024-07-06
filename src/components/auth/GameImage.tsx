export default function GameImage({ isFlipped }: { isFlipped: boolean }){
    return (
        <div className="image-container h-full overflow-hidden flex-1 relative" id={isFlipped ? "flipOrder1" : "flipOrder2"}>
            <div className="bg-black opacity-30 absolute w-full h-full z-10"></div>
            <img src="https://www.allkeyshop.com/blog/wp-content/uploads/rainbow-six-siege.png" alt="Game" className="w-full h-full object-cover" />
        </div>
    )
}