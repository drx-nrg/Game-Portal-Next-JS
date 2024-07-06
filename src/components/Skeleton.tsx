export default function Skeleton({ className } : { className?: string }){
    return <div className={`w-full flex-1 h-[300px] bg-gray-300 animate-pulse rounded-md ${className ? className : ""}`}></div>
}