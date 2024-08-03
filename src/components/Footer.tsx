export default function Footer(){
    return (
        <footer className="w-full h-fit p-10 grid grid-cols-4 bg-slate-900">
            <div className="w-full flex-1 flex flex-col">
                <h1 className="text-2xl font-semibold font-['Public Sans'] flex flex-row items-center gap-2 text-white mb-2">
                    <i className="bi bi-controller block -rotate-12"></i>Gaming Portal
                </h1>
                <p className="text-white opacity-70">
                    Visionary game portal platform, created by player to the whole world
                </p>
                <ul className="social-media mt-5 flex flex-row justify-start gap-10 items-center">
                    <li><i className="bi bi-instagram text-2xl text-white opacity-70"></i></li>
                    <li><i className="bi bi-youtube text-2xl text-white opacity-70"></i></li>
                    <li><i className="bi bi-twitter text-2xl text-white opacity-70"></i></li>
                </ul>
            </div>
        </footer>
    );
}