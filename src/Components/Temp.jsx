import React, { useEffect, useState } from "react";
import forest3 from "../assets/forest3.webp";

const Temp = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("Delhi"); // default city
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const API_KEY = "b901e52777a33c10b1e734bedd0d6f31";

    // Animate dots
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 5);
        }, 300);
        return () => clearInterval(interval);
    }, []);


    // Function to calculate local time
    const getLocalTime = (timezone) => {
    // timezone from API is in seconds
    const utc = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000); // current time
    const local = new Date(utc.getTime() + timezone * 1000); // add timezone seconds
    return local.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};


    //  Condition Icon map
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case "Clear":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-sun-high"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1m-4.95 -2.05a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m11.314 0l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m-5.049 -9.836a5 5 0 1 1 -2.532 9.674a5 5 0 0 1 2.532 -9.674m-9.315 3.886a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm18 0a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm-16.364 -6.778l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m14.142 0a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m-7.778 -3.222a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1" /></svg>
            case "Clouds":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-cloud"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.04 4.305c2.195 -.667 4.615 -.224 6.36 1.176c1.386 1.108 2.188 2.686 2.252 4.34l.003 .212l.091 .003c2.3 .107 4.143 1.961 4.25 4.27l.004 .211c0 2.407 -1.885 4.372 -4.255 4.482l-.21 .005h-11.878l-.222 -.008c-2.94 -.11 -5.317 -2.399 -5.43 -5.263l-.005 -.216c0 -2.747 2.08 -5.01 4.784 -5.417l.114 -.016l.07 -.181c.663 -1.62 2.056 -2.906 3.829 -3.518l.244 -.08z" /></svg>;
            case "Rain":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cloud-rain"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" /></svg>;
            case "Drizzle":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-droplets"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.072 20.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67 -3.798l-2.095 -3.227a.6 .6 0 0 0 -1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798z" /><path d="M16.072 20.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67 -3.798l-2.095 -3.227a.6 .6 0 0 0 -1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798z" /><path d="M10.072 10.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67 -3.798l-2.095 -3.227a.6 .6 0 0 0 -1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798z" /></svg>;
            case "Thunderstorm":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cloud-bolt"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 18.004h-6.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.396 0 2.6 .831 3.148 2.03" /><path d="M19 16l-2 3h4l-2 3" /></svg>;
            case "Snow":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-snowflake"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 4l2 1l2 -1" /><path d="M12 2v6.5l3 1.72" /><path d="M17.928 6.268l.134 2.232l1.866 1.232" /><path d="M20.66 7l-5.629 3.25l.01 3.458" /><path d="M19.928 14.268l-1.866 1.232l-.134 2.232" /><path d="M20.66 17l-5.629 -3.25l-2.99 1.738" /><path d="M14 20l-2 -1l-2 1" /><path d="M12 22v-6.5l-3 -1.72" /><path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232" /><path d="M3.34 17l5.629 -3.25l-.01 -3.458" /><path d="M4.072 9.732l1.866 -1.232l.134 -2.232" /><path d="M3.34 7l5.629 3.25l2.99 -1.738" /></svg>;
            case "Mist":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mist"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 5h3m4 0h9" /><path d="M3 10h11m4 0h1" /><path d="M5 15h5m4 0h7" /><path d="M3 20h9m4 0h3" /></svg>;
            case "Haze":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-haze"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h1" /><path d="M12 3v1" /><path d="M20 12h1" /><path d="M5.6 5.6l.7 .7" /><path d="M18.4 5.6l-.7 .7" /><path d="M8 12a4 4 0 1 1 8 0" /><path d="M3 16h18" /><path d="M3 20h18" /></svg>;
            case "Fog":
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cloud-fog"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 16a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12" /><path d="M5 20l14 0" /></svg>;
            default:
                return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-seedling"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" /><path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" /><path d="M12 20l0 -10" /></svg>;
        }
    };

    // Fetch weather function
    const fetchWeather = async (city) => {
        if (!city) return;
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await res.json();

            if (data.cod === 200) {
                setWeather({
                    name: data.name,
                    temp: data.main.temp,
                    condition: data.weather[0].main,
                    time: getLocalTime(data.timezone),
                });
                setError("");
            } else {
                setWeather(null);
                setError("No data found.");
            }
        } catch {
            setWeather(null);
            setError("No data found.");
        }
    };

    // Fetch default city once on load
    useEffect(() => {
        fetchWeather(searchInput); // loads "delhi" by default
    }, []);

    // Fetch weather on Enter
    const handleSearch = async (e) => {
        if (e.key !== "Enter") return;
        fetchWeather(searchInput);
    };

    return (
        <div className="relative h-screen w-screen text-white overflow-hidden">
            {/* Background video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="https://www.pexels.com/download/video/1448735/"
            />


            <div className="relative z-10 p-5 text-white">
                {/* Top bar */}
                <div className="flex justify-between pt-5 items-center md:pb-8 pb-15">
                    <div className="flex items-center gap-2 absolute left-5">
                        {/* Search icon */}
                        <div
                            className="cursor-pointer"
                            onClick={() => setShowSearch((prev) => !prev)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        </div>

                        {/* Search input */}
                        {showSearch && (
                            <>
                                {/* Large screens → beside icon */}
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={handleSearch}
                                    placeholder="Enter city..."
                                    className="hidden md:block text-sm w-48 lg:w-64 p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-white bg-gray-700 text-white"
                                />

                                {/* Small screens → dropdown */}
                                <div className="absolute top-10 left-0 w-40 sm:w-56 md:hidden">
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={handleSearch}
                                        placeholder="Enter city..."
                                        className="text-sm w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-white bg-gray-700 text-white"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-row items-center  gap-2 absolute left-1/2 -translate-x-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-2" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-temperature-snow"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 1 0 -4 0v8.5" /><path d="M4 9h4" /><path d="M14.75 4l1 2h2.25" /><path d="M17 4l-3 5l2 3" /><path d="M20.25 10l-1.25 2l1.25 2" /><path d="M22 12h-6l-2 3" /><path d="M18 18h-2.25l-1 2" /><path d="M17 20l-3 -5h-1" /><path d="M12 9l2.088 .008" /></svg>
                        <h1 className="text-4xl font-semibold">Climora</h1>
                    </div>

                    {/* Menu icon */}
                    <div className="absolute right-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-deep"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6h16" /><path d="M7 12h13" /><path d="M10 18h10" /></svg>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex gap-4 items-end h-10 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-2 rounded-full transition-all duration-150 ${activeIndex === i
                                ? "bg-white translate-y-[-6px] scale-120"
                                : "bg-gray-400"
                                }`}
                        />
                    ))}
                </div>

                {/* Weather display */}
                <div className="lg:px-100 p-4 md:px-20 ">
                    {weather && (
                        <div className="relative px-5 py-4 h-120  bg-gray-800 rounded-md bg-cover bg-center"
                            style={{ backgroundImage: `url(${forest3})`, }}>

                            {/* Blur overlay */}
                            <div className="absolute inset-0 bg-black/10 backdrop-blur-md"></div>

                            <div className="relative z-10">
                                <div className=" pb-6">
                                    <h1 className="text-5xl font-bold pb-3">{weather.name}</h1>
                                    <p>Local Time: {weather.time}</p>
                                </div>

                                <h1 className="pt-10 text-7xl">{weather.temp}°C</h1>

                                <div className="mt-35 border-1 border-white "></div>

                                {/* ✅ Show icon with condition */}
                                <div className="text-2xl mt-5 flex items-centre gap-4">
                                    <span className="mt-6 text-7xl">{getWeatherIcon(weather.condition)}</span>
                                    <p className="mt-6">{weather.condition}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Temp;
