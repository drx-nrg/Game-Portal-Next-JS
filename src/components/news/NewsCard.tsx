import { truncateString } from '@/lib/truncateString';

export interface News{
    source: {
        id: number | null,
        name: string 
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export default function NewsCard({ news, className } : { news: News, className?: string }){
    return (
        <div className={`w-[400px] h-[200px] rounded-md overflow-hidden relative ${className ? className : ""}`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent flex flex-row items-end p-5">
                <h1 className="text-white text-xl font-['Rubik'] font-semibold">{truncateString(news.title, 50)}</h1>
            </div>
            <img src={news.urlToImage?.toLowerCase() !== "[removed]" ? news.urlToImage : "/thumbnail.png"} className="w-full h-full object-cover" />
        </div>
    );
}