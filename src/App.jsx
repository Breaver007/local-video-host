import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileTree from './components/FileTree/FileTree';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import './App.css';
import {FaMoon, FaSun, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function App() {
    const [fileTree, setFileTree] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMainHidden, setIsMainHidden] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setIsMainHidden(!isMainHidden);
    };

    useEffect(() => {
        const savedState = localStorage.getItem('sidebarState');
        const fetchFileStructure = async () => {
            try {
                console.log(process.env.REACT_APP_API_URL);
                console.log(process.env.REACT_APP_API_PORT);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/structure`);
                setFileTree(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (savedState) setIsSidebarOpen(JSON.parse(savedState));

        if (localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        fetchFileStructure();
    }, []);

    useEffect(() => {
        localStorage.setItem('sidebarState', JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    const handleSelectVideo = (file) => {
        // Преобразуем локальный путь в URL сервера
        const videoUrl = file.path.replace(/^.*[\\\/]Videos[\\\/]/i, '/Videos/');
        setSelectedVideo(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${videoUrl}`);
    };
    // Переключение темы
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        } else {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }
    };

    if (loading)
    {
        return (
            <div className={`transition-theme dark:bg-gray-900`}>
                <div className="container mx-auto min-h-screen flex flex-col transition-theme dark:bg-gray-900">
                    {/* Шапка */}
                    <header className="relative h-16 bg-blue-900 shadow-md dark:bg-[#140445] rounded-br-lg rounded-bl-lg">
                        <h1 className="text-2xl font-bold text-white w-full text-center my-3">
                            Видео Библиотека
                        </h1>
                        <div className={`flex items-center gap-2 absolute inset-y-2 left-0 ms-3`}>
                            <img
                                alt="Логотип Белинновация"
                                width={40}
                                height={40}
                                className="brightness-125 object-contain h-10 w-10"
                                src="/images/Logo1.ico"
                            />
                            <img
                                alt="Название Белинновация"
                                width={190}
                                height={27}
                                className="md:visible invisible brightness-125 object-contain h-[27px] w-[190px]"
                                src="/images/Logo.webp"
                            />
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className={`absolute inset-y-3 right-0 m-auto p-2 rounded-full text-white hover:bg-white/10 transition-colors`}>
                            {darkMode ? <FaSun/> : <FaMoon/>}
                        </button>
                    </header>
                    <div className="max-w-4xl flex content-center mx-auto h-auto  my-4 bg-white dark:bg-gray-600 rounded-xl shadow-md dark:shadow-red-800 p-8">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Загрузка структуры видео...</h3>
                    </div>
                </div>
            </div>
        )
    }
    if (error)
    {
        return (
            <div className={`transition-theme dark:bg-gray-900`}>
                <div className="container mx-auto min-h-screen flex flex-col transition-theme dark:bg-gray-900">
                    {/* Шапка */}
                    <header className="relative h-16 bg-blue-900 shadow-md dark:bg-[#140445] rounded-br-lg rounded-bl-lg">
                        <h1 className="text-2xl font-bold text-white w-full text-center my-3">
                            Видео Библиотека
                        </h1>
                        <div className={`flex items-center gap-2 absolute inset-y-2 left-0 ms-3`}>
                            <img
                                alt="Логотип Белинновация"
                                width={40}
                                height={40}
                                className="brightness-125 object-contain h-10 w-10"
                                src="/images/Logo1.ico"
                            />
                            <img
                                alt="Название Белинновация"
                                width={190}
                                height={27}
                                className="md:visible invisible brightness-125 object-contain h-[27px] w-[190px]"
                                src="/images/Logo.webp"
                            />
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className={`absolute inset-y-3 right-0 m-auto p-2 rounded-full text-white hover:bg-white/10 transition-colors`}>
                            {darkMode ? <FaSun/> : <FaMoon/>}
                        </button>
                    </header>
                        <div className="max-w-4xl mx-auto  h-32 my-4 bg-white dark:bg-gray-600 rounded-xl shadow-md dark:shadow-red-800 p-8 text-center">
                            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Ошибка:</h3>
                            <p className="text-red-500 dark:text-red-400">{error}</p>
                        </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`transition-theme dark:bg-gray-900`}>
            <div className="container mx-auto min-h-screen flex flex-col transition-theme dark:bg-gray-900">
                {/* Шапка */}
                <header className="relative h-16 bg-blue-900 shadow-md dark:bg-[#140445] rounded-br-lg rounded-bl-lg">
                    <h1 className="text-2xl font-bold text-white w-full text-center my-3">
                        Видео Библиотека
                    </h1>
                    <div className={`flex items-center gap-2 absolute inset-y-2 left-0 ms-3`}>
                        <img
                            alt="Логотип Белинновация"
                            width={40}
                            height={40}
                            className="brightness-125 object-contain h-10 w-10"
                            src="/images/Logo1.ico"
                        />
                        <img
                            alt="Название Белинновация"
                            width={190}
                            height={27}
                            className="md:visible invisible brightness-125 object-contain h-[27px] w-[190px]"
                            src="/images/Logo.webp"
                        />
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`absolute inset-y-3 right-0 m-auto p-2 rounded-full text-white hover:bg-white/10 transition-colors`}>
                        {darkMode ? <FaSun/> : <FaMoon/>}
                    </button>
                </header>
                {/* Основное содержимое */}
                <div className="flex flex-1 overflow-hidden relative">
                    {/* Боковая панель */}
                    <aside
                        className={`${
                            isSidebarOpen ? 'w-80' : 'w-0'
                        } bg-white shadow-lg border-r border-gray-200 dark:bg-[#041743] dark:border-[#fff0] transition-all duration-300 overflow-hidden`}
                    >
                        <div className="h-full flex flex-col">
                            <div className="border-b border-gray-100 dark:border-[#fff0]">
                                <h2 className="font-bold ms-3 my-4 text-gray-700 dark:text-gray-300">
                                    Папки с видео
                                </h2>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <FileTree data={fileTree} onSelect={handleSelectVideo}/>
                            </div>
                        </div>
                    </aside>
                    <button
                        onClick={toggleSidebar}
                        className={`absolute top-1/2 z-50 p-2 bg-white dark:bg-[#041743] rounded-full shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${
                            isSidebarOpen ? 'left-[19rem]' : '-left-2.5'
                        }`}

                    >
                        {isSidebarOpen ? (
                            <FaChevronLeft className="text-gray-600 dark:text-gray-300"/>
                        ) : (
                            <FaChevronRight className="text-gray-600 dark:text-gray-300"/>
                        )}
                    </button>
                    {/* Основная область контента */}
                    <main className={`flex-1 bg-gray-50 dark:bg-gray-800 p-6 overflow-y-auto ${isMainHidden ? '' : 'max-[600px]:hidden'}`}>
                        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-800/50">
                            <VideoPlayer videoPath={selectedVideo}/>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;