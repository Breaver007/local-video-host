import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFileVideo } from 'react-icons/fa';

const FileTreeItem = ({ item, depth = 0, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (item.type === 'directory') {
            setIsOpen(!isOpen);
        } else {
            onSelect(item);
        }
    };

    return (
        <div className={`pl-${depth * 4} transition-colors duration-150 ease-in-out`}>
            <button className={`flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 
               active:bg-gray-200  dark:active:bg-gray-600  transition-colors duration-100 
                ${item.type === 'directory' ?
                'font-medium text-gray-800 dark:text-gray-200' :
                'text-gray-600 dark:text-gray-300'}`}
                 onClick={handleClick}>
                {item.type === 'directory' ? (
                    isOpen ? (
                        <FaFolderOpen className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0"/>
                    ) : (
                        <FaFolder className="text-blue-400 dark:text-blue-300 mr-2 flex-shrink-0"/>
                    )
                ) : (
                    <FaFileVideo className="text-red-400 dark:text-red-300 mr-2 flex-shrink-0"/>
                )}
                <span className={`item-name truncate${item.type === 'directory' ? 'text-gray-800' : 'text-gray-600' }`} title={item.name}>
                        {item.name}
                </span>
            </button>
            {isOpen && item.children && (
                <div className={`children ml-2 border-l-2 border-gray-200 pl-2 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
                    {item.children.map((child, index) => (
                        <FileTreeItem
                            key={index}
                            item={child}
                            depth={depth + 1}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileTreeItem;