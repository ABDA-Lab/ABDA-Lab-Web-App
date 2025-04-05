import {
    FileIcon,
    FolderIcon,
    Share2Icon,
    LockIcon,
    FileTextIcon,
    FileImageIcon,
    FileVideoIcon,
    FileAudioIcon,
    FileJsonIcon,
    FileCodeIcon,
    PenToolIcon,
    StarIcon,
} from 'lucide-react';
import { useState } from 'react';

interface FileFolderProps {
    id: string;
    name: string;
    type: 'file' | 'folder';
    isShared?: boolean;
    isSelected?: boolean;
    isStarred?: boolean;
    owner?: string;
    updatedAt?: string;
    itemCount?: number;
    size?: string;
    fileType?: string;
    thumbnailUrl?: string;
    className?: string;
    onClick?: () => void;
    onDoubleClick?: () => void;
    onRightClick?: (e: React.MouseEvent) => void;
    onStarClick?: () => void;
    disabled?: boolean;
}

export default function FileFolder({
    id,
    name,
    type,
    isShared = false,
    isSelected = false,
    isStarred = false,
    owner,
    updatedAt,
    itemCount,
    size,
    fileType,
    thumbnailUrl,
    className = '',
    onClick,
    onDoubleClick,
    onRightClick,
    onStarClick,
    disabled = false,
}: FileFolderProps) {
    const isFolder = type === 'folder';
    const [isHovered, setIsHovered] = useState(false);

    // Determine file type icon based on extension
    const getFileIcon = () => {
        if (thumbnailUrl) {
            return (
                <div className="relative w-12 h-12">
                    <img
                        src={thumbnailUrl}
                        alt={`${name} thumbnail`}
                        className="w-full h-full object-cover rounded-sm"
                    />
                </div>
            );
        }

        if (!fileType && name) {
            const extension = name.split('.').pop()?.toLowerCase();

            switch (extension) {
                case 'txt':
                case 'doc':
                case 'docx':
                case 'pdf':
                    return <FileTextIcon size={36} />;
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                case 'webp':
                    return <FileImageIcon size={36} />;
                case 'mp4':
                case 'mov':
                case 'webm':
                    return <FileVideoIcon size={36} />;
                case 'mp3':
                case 'wav':
                case 'ogg':
                    return <FileAudioIcon size={36} />;
                case 'json':
                    return <FileJsonIcon size={36} />;
                case 'js':
                case 'ts':
                case 'jsx':
                case 'tsx':
                case 'html':
                case 'css':
                case 'py':
                    return <FileCodeIcon size={36} />;
                default:
                    return <FileIcon size={36} />;
            }
        }

        return <FileIcon size={36} />;
    };

    // Format file size (e.g. 1.5 MB)
    const formattedDate = updatedAt ? new Date(updatedAt).toLocaleDateString() : undefined;

    return (
        <div
            className={`group relative flex flex-col p-3 rounded-lg transition-all
      ${
          isSelected
              ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary'
              : 'bg-card hover:bg-muted/50 dark:hover:bg-muted/10'
      }
      ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      ${className}`}
            onClick={!disabled ? onClick : undefined}
            onDoubleClick={!disabled ? onDoubleClick : undefined}
            onContextMenu={!disabled ? onRightClick : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role={onClick ? 'button' : 'article'}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}>
            {/* Top actions */}
            <div
                className={`absolute top-2 right-2 flex items-center gap-1.5 transition-opacity ${
                    isHovered || isSelected ? 'opacity-100' : 'opacity-0'
                }`}>
                {onStarClick && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onStarClick();
                        }}
                        className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors
              ${isStarred ? 'text-yellow-500' : 'text-gray-400'}`}>
                        <StarIcon size={16} className={isStarred ? 'fill-yellow-500' : ''} />
                    </button>
                )}
            </div>

            {/* Icon */}
            <div className="flex items-center justify-center w-full mb-2 pt-2">
                <div
                    className={`flex items-center justify-center p-1.5 rounded-lg
          ${isFolder ? 'text-amber-500 dark:text-amber-400' : 'text-blue-500 dark:text-blue-400'}
        `}>
                    {isFolder ? <FolderIcon size={36} /> : getFileIcon()}
                </div>
            </div>

            {/* Info */}
            <div className="w-full flex-grow">
                <p className="text-sm font-medium text-center truncate max-w-full" title={name}>
                    {name}
                </p>

                <div className="mt-1 flex items-center justify-center text-xs text-muted-foreground">
                    {isFolder && itemCount !== undefined && (
                        <span>
                            {itemCount} item{itemCount !== 1 ? 's' : ''}
                        </span>
                    )}
                    {!isFolder && size && <span>{size}</span>}
                </div>
            </div>

            {/* Footer with status indicators */}
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100 dark:border-zinc-700/50">
                {updatedAt && <span className="text-xs text-muted-foreground">{formattedDate}</span>}

                <div className="flex items-center gap-1 ml-auto">
                    {isShared && <Share2Icon size={14} className="text-green-600 dark:text-green-500" />}
                    {!isShared && <LockIcon size={14} className="text-gray-400 dark:text-gray-500" />}
                </div>
            </div>
        </div>
    );
}
