import React from 'react';
import FileTreeItem from './FileTreeItem';

const FileTree = ({ data, onSelect }) => {
    return (
        <div  className={`pl-2 py-1 rounded`}>
            {data.map((item, index) => (
                <FileTreeItem
                    key={index}
                    item={item}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default FileTree;