import Navigation from './Navigation';

export default function Header() {
    return (
        <header className="">
            <div className="w-full bg-white border-b">
                <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold">Logo</h1>
                    </div>
                    <Navigation />
                    <div className="flex items-center space-x-4">
                        <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
