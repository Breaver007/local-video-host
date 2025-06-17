import React from 'react';

const VideoPlayer = ({ videoPath }) => {
    if (!videoPath) {
        return (
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-gray-800/50 p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Видео не выбрано</h3>
                <p className="text-gray-500 dark:text-gray-400">Выберите видео из дерева папок слева</p>
            </div>
        );
    }

    return (
        <div className={`h-1/2 flex flex-col items-center rounded-lg dark:bg-gray-900`}>
            <video className={`h-96 my-4`} controls controlsList="nodownload" key={videoPath}>
                <source src={videoPath} type="video/mp4" />
                Ваш браузер не поддерживает видео тег.
            </video>
            <div className="text-gray-700 dark:text-gray-400">
                <h3 className={`m-2`}>{videoPath.split('/').pop()}</h3>
            </div>
        </div>
    );
};

export default VideoPlayer;