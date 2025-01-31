import { FileIcon, FolderIcon } from 'lucide-react';

interface FileFolderProps {
    name: string;
    type: 'file' | 'folder';
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    description?: string;
    size?: string;
    lastModified?: string;
    disabled?: boolean;
}

export default function FileFolder({
    name,
    type,
    onClick,
    className = '',
    icon,
    description,
    size,
    lastModified,
    disabled = false,
}: FileFolderProps) {
    const isFolder = type === 'folder';

    return (
        <div
            className={`flex flex-col items-center justify-between w-36 h-44 p-4 border border-gray-200 dark:border-zinc-700 
            rounded-md bg-gray-50 dark:bg-zinc-800 transition-all cursor-pointer ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
            } ${className}`}
            onClick={!disabled ? onClick : undefined}
            role={onClick ? 'button' : 'article'}>
            <div
                className={`flex items-center justify-center w-16 h-16 ${
                    isFolder ? 'text-yellow-500' : 'text-blue-500'
                }`}>
                {icon || (isFolder ? <FolderIcon size={40} /> : <FileIcon size={40} />)}
            </div>

            <div className="w-full text-center">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{name}</p>
                {description && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{description}</p>}
                {(size || lastModified) && (
                    <div className="flex justify-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                        {size && <span>{size}</span>}
                        {lastModified && <span>{lastModified}</span>}
                    </div>
                )}
            </div>

            {isFolder && <span className="text-xs font-medium text-yellow-500">Folder</span>}
            {!isFolder && <span className="text-xs font-medium text-blue-500">File</span>}
        </div>
    );
}
