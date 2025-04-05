'use client';

import { useMemo, useState } from 'react';
import {
    Search,
    Upload,
    Grid,
    List,
    Filter,
    Download,
    Share,
    Trash,
    Plus,
    FileText,
    Folder,
    Divide,
    DivideCircle,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import CustomDropdown from '../CustomDropdown';
import FileFolder from '../resources/FileFolder';
import FileFolderSharing from '../resources/FileFolderSharing';
import UploadFile from '../resources/UploadFile';

// Define interfaces for the data types
interface BaseItem {
    id: string;
    name: string;
    type: string;
    updatedAt: string;
    owner: string;
    shared: boolean;
}

interface FileItem extends BaseItem {
    type: 'file';
    size: string;
}

interface FolderItem extends BaseItem {
    type: 'folder';
    itemCount: number;
}

type Item = FileItem | FolderItem;

// Giả lập dữ liệu files và folders
const mockFiles: FileItem[] = [
    { id: '1', name: 'Paper.txt', type: 'file', size: '245 KB', updatedAt: '2025-04-01', owner: 'Andy', shared: true },
    {
        id: '2',
        name: 'Research Data.xlsx',
        type: 'file',
        size: '1.2 MB',
        updatedAt: '2025-04-03',
        owner: 'Andy',
        shared: false,
    },
    {
        id: '3',
        name: 'Presentation.pptx',
        type: 'file',
        size: '3.5 MB',
        updatedAt: '2025-04-05',
        owner: 'Jane',
        shared: true,
    },
];

const mockFolders: FolderItem[] = [
    {
        id: '1',
        name: 'Learning AI',
        type: 'folder',
        itemCount: 12,
        updatedAt: '2025-03-28',
        owner: 'Andy',
        shared: true,
    },
    {
        id: '2',
        name: 'Machine Learning',
        type: 'folder',
        itemCount: 8,
        updatedAt: '2025-04-02',
        owner: 'Andy',
        shared: true,
    },
    {
        id: '3',
        name: 'Lab Documents',
        type: 'folder',
        itemCount: 5,
        updatedAt: '2025-04-04',
        owner: 'Andy',
        shared: false,
    },
];

export default function SharingFileTab() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPath, setCurrentPath] = useState<string>('/');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'type'>('name');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    // Xử lý chọn file/folder
    const handleSelect = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };
    const handleUploadComplete = (files: File[]) => {
        // Xử lý logic sau khi upload thành công
        console.log('Files uploaded:', files);
        // Có thể thêm code để refresh danh sách files ở đây
    };

    // Breadcrumb navigation
    const pathParts = currentPath.split('/').filter(Boolean);

    // Combine folders and files for pagination
    const allItems = useMemo(() => {
        return [...mockFolders, ...mockFiles];
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(allItems.length / itemsPerPage);

    // Get paginated items
    const paginatedItems = useMemo(() => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        return allItems.slice(startIdx, endIdx);
    }, [allItems, currentPage, itemsPerPage]);

    // Split paginated items back into folders and files
    const displayFolders = paginatedItems.filter((item) => item.type === 'folder') as FolderItem[];
    const displayFiles = paginatedItems.filter((item) => item.type === 'file') as FileItem[];

    // Handle page navigation
    const goToPage = (page: number) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            {/* Toolbar chính */}
            <div className="flex items-center justify-between bg-card rounded-lg p-2">
                <div className="flex items-center space-x-2">
                    <button
                        className="btn btn-sm btn-outline flex items-center gap-1"
                        onClick={() => setIsUploadModalOpen(true)}>
                        <Upload size={16} /> Upload
                    </button>
                    <div>|</div>
                    <button className="btn btn-sm btn-outline flex items-center gap-1">
                        <Plus size={16} /> Create new folder
                    </button>
                </div>

                <div className="relative w-1/3">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        className="w-full rounded-md border px-8 py-2"
                        placeholder="Tìm kiếm tài liệu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        className={`btn btn-sm btn-icon ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setViewMode('grid')}>
                        <Grid size={16} />
                    </button>
                    <button
                        className={`btn btn-sm btn-icon ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setViewMode('list')}>
                        <List size={16} />
                    </button>
                    <CustomDropdown
                        label="Sort by"
                        options={[
                            { label: 'File name', onClick: () => setSortBy('name') },
                            { label: 'Updated', onClick: () => setSortBy('date') },
                            { label: 'Size', onClick: () => setSortBy('size') },
                            { label: 'Kind', onClick: () => setSortBy('type') },
                        ]}
                    />
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-1 text-sm">
                <button className="hover:underline" onClick={() => setCurrentPath('/')}>
                    Home
                </button>
                {pathParts.map((part, index) => (
                    <div key={index} className="flex items-center">
                        <span className="mx-1">/</span>
                        <button
                            className="hover:underline"
                            onClick={() => setCurrentPath('/' + pathParts.slice(0, index + 1).join('/'))}>
                            {part}
                        </button>
                    </div>
                ))}
            </div>

            {/* Khu vực hiển thị nội dung chính */}
            {/* Khu vực hiển thị nội dung chính */}
            <div className="flex-1 rounded-xl bg-card p-4">
                {selectedItems.length > 0 ? (
                    <div className="mb-4 flex items-center justify-between bg-muted/30 p-2 rounded-lg">
                        <span>{selectedItems.length} selected</span>
                        <div className="flex space-x-2">
                            <button className="btn btn-sm btn-outline flex items-center gap-1">
                                <Download size={16} /> Download
                            </button>
                            <button className="btn btn-sm btn-outline flex items-center gap-1">
                                <Share size={16} /> Share
                            </button>
                            <button className="btn btn-sm btn-outline text-destructive flex items-center gap-1">
                                <Trash size={16} /> Delete
                            </button>
                        </div>
                    </div>
                ) : null}

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {displayFolders.map((folder) => (
                            <div
                                key={folder.id}
                                className={`cursor-pointer ${
                                    selectedItems.includes(folder.id) ? 'ring-2 ring-primary' : ''
                                }`}
                                onClick={() => handleSelect(folder.id)}
                                onDoubleClick={() => setCurrentPath(`${currentPath}${folder.name}/`)}>
                                <FileFolder
                                    id={folder.id}
                                    name={folder.name}
                                    type="folder"
                                    itemCount={folder.itemCount}
                                    isShared={folder.shared}
                                />
                            </div>
                        ))}
                        {displayFiles.map((file) => (
                            <div
                                key={file.id}
                                className={`cursor-pointer ${
                                    selectedItems.includes(file.id) ? 'ring-2 ring-primary' : ''
                                }`}
                                onClick={() => handleSelect(file.id)}>
                                <FileFolder
                                    id={file.id}
                                    name={file.name}
                                    type="file"
                                    size={file.size}
                                    isShared={file.shared}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="pb-2 font-medium">Tên</th>
                                <th className="pb-2 font-medium">Chủ sở hữu</th>
                                <th className="pb-2 font-medium">Cập nhật lúc</th>
                                <th className="pb-2 font-medium">Kích thước</th>
                                <th className="pb-2 font-medium text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayFolders.map((folder) => (
                                <tr
                                    key={folder.id}
                                    className={`border-b hover:bg-muted/30 ${
                                        selectedItems.includes(folder.id) ? 'bg-muted/50' : ''
                                    }`}
                                    onClick={() => handleSelect(folder.id)}>
                                    <td className="py-2 flex items-center gap-2">
                                        <Folder className="h-4 w-4" />
                                        {folder.name}{' '}
                                        <span className="text-xs text-muted-foreground">({folder.itemCount} mục)</span>
                                    </td>
                                    <td>{folder.owner}</td>
                                    <td>{folder.updatedAt}</td>
                                    <td>--</td>
                                    <td className="text-right">
                                        <button className="btn btn-xs btn-ghost">
                                            <Share className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {displayFiles.map((file) => (
                                <tr
                                    key={file.id}
                                    className={`border-b hover:bg-muted/30 ${
                                        selectedItems.includes(file.id) ? 'bg-muted/50' : ''
                                    }`}
                                    onClick={() => handleSelect(file.id)}>
                                    <td className="py-2 flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        {file.name}
                                    </td>
                                    <td>{file.owner}</td>
                                    <td>{file.updatedAt}</td>
                                    <td>{file.size}</td>
                                    <td className="text-right">
                                        <button className="btn btn-xs btn-ghost">
                                            <Download className="h-4 w-4" />
                                        </button>
                                        <button className="btn btn-xs btn-ghost">
                                            <Share className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(currentPage * itemsPerPage, allItems.length)}</span>{' '}
                            of <span className="font-medium">{allItems.length}</span> items
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="btn btn-sm btn-ghost flex items-center disabled:opacity-50">
                                <ChevronLeft size={16} />
                                Previous
                            </button>

                            <div className="flex space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Calculate page numbers to show (centered around current page)
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => goToPage(pageNum)}
                                            className={`btn btn-sm ${
                                                currentPage === pageNum ? 'btn-primary' : 'btn-ghost'
                                            }`}>
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm btn-ghost flex items-center disabled:opacity-50">
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <UploadFile
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadComplete={handleUploadComplete}
                currentPath={currentPath}
                maxFileSize={50}
                maxFiles={10}
            />
        </div>
    );
}
