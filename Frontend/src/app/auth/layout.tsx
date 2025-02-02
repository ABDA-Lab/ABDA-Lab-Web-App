import HeaderAuth from '@/components/authentication/headerAuth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <HeaderAuth />
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
                <main>{children}</main>
            </div>
        </div>
    );
}
