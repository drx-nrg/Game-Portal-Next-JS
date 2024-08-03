interface SectionHeaderProps{
    firstTitle: string, 
    secondTitle: string, 
    thirdTitle: string
}

export default function SectionHeader({ firstTitle, secondTitle, thirdTitle } : SectionHeaderProps){
    return (
        <>
            <h1 className="text-xl text-red-700 font-semibold font-['Rubik'] mb-3 text-center tracking-wider">{firstTitle.toUpperCase()}</h1>
            <h1 className="font-['Inter'] font-semibold text-3xl text-center">{secondTitle}</h1>
            <p className="text-slate-600 mt-1 text-lg text-center">{thirdTitle}</p>
        </>
    );
}