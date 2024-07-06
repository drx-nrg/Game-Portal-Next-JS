"use client"
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Breadcrumbs({ path } : { path: string }){
    let paths = path.split("/");
    paths = paths.filter(path => path !== "");
    return (
        <ul className="flex flex-row gap-5 text-xl mb-3">
            <li><Link className="text-blue-500" href="/home">HOME</Link></li>
            <li>{">>"}</li>
            {paths.map((path, index) => (
                <div key={index}>
                    <li><Link href="/discover">{path.toUpperCase()}</Link></li>
                    {(paths.length - 1) !== index && <li>{">>"}</li>}
                </div>
            ))}
        </ul>
    );
}