'use client';

import { useMemo, useState } from 'react';
import {
    Search,
    Upload,
    Grid,
    List,
    Download,
    Share,
    Trash,
    Plus,
    FileText,
    Folder,
} from 'lucide-react';
import CustomDropdown from '../CustomDropdown';
import FileFolder from '../resources/FileFolder';
import UploadFile from '../resources/UploadFile';
import PaginationControls from './PagiantionControls';

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
        console.log('Files uploaded:', files);
    };

    const pathParts = currentPath.split('/').filter(Boolean);

    const allItems = useMemo(() => {
        return [...mockFolders, ...mockFiles];
    }, []);

    const totalPages = Math.ceil(allItems.length / itemsPerPage);

    const paginatedItems = useMemo(() => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        return allItems.slice(startIdx, endIdx);
    }, [allItems, currentPage, itemsPerPage]);

    const displayFolders = paginatedItems.filter((item) => item.type === 'folder') as FolderItem[];
    const displayFiles = paginatedItems.filter((item) => item.type === 'file') as FileItem[];

    const goToPage = (page: number) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div>Sharing materials</div>
            {/* Toolbar chính */}
            <div className="flex items-center justify-between bg-card rounded-lg p-2">
                <div className="flex items-center gap-3">
                    <button
                        className="btn btn-primary flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
                        onClick={() => setIsUploadModalOpen(true)}>
                        <Upload size={18} strokeWidth={2} />
                        <span className="font-medium">Upload</span>
                    </button>

                    <button className="btn bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all">
                        <Plus size={18} strokeWidth={2} />
                        <span className="font-medium">Create Folder</span>
                    </button>
                </div>

                <div className="relative w-1/3">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        className="w-full rounded-md border px-8 py-2"
                        placeholder="Search documents..."
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
            <div className="flex-1 rounded-xl bg-card p-4">
                {selectedItems.length > 0 ? (
                    <div
                        className={`h-12 mb-4 flex items-center justify-between rounded-lg transition-all duration-200 ${
                            selectedItems.length > 0 ? 'opacity-100 bg-muted/30 p-2' : 'opacity-0 pointer-events-none'
                        }`}>
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
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={allItems.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
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
