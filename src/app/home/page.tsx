const Home = () => {
    return (
        <section id="home" className="pt-11">
            <div className="container min-w-full h-screen border border-slate-900">
                <div className="header bg-gray-50 w-full h-fit px-10 py-20 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-semibold">Hi, Dev1!</h1>
                    <h2>Last Login At: 2024-09-11</h2>
                </div>
                <div className="main-content mt-5 px-20">
                    <h1 className="text-2xl font-semibold">Highscores</h1>
                    <p className="text-slate-600">Highscores per game</p>
                    <ol type="1" className="block mt-3 text-xl">
                        {[...Array(5)].map((_, index) => (
                            <li>{index + 1}. Breakbreakers (2009)</li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

export default Home