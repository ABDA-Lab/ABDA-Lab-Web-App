import { Input } from '@/components/ui/input';
import { Metadata } from 'next';
import { MailOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
};

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-4 p-4 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
                    <p className="mt-2 text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link className="text-blue-500" href="/register">
                            Register now
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4 flex flex-col gap-3">
                        <div className="flex justify-center mb-5">
                            <Button>
                                <MailOpen /> Login with Google
                            </Button>
                        </div>
                        <div>
                            <Input type="text" placeholder="Enter your email" />
                        </div>
                        <div>
                            <Input type="password" placeholder="Enter your password" />
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button
                            type="submit"
                            className="relative inline-flex w-[50%] h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                Sign in
                            </span>
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <Link className="text-blue-500 text-sm" href="#">
                            Forgot password
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
