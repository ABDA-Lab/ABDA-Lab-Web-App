import { Metadata } from 'next';
import { LoginForm } from '@/components/authentication/loginForm';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
};

export default function LoginPage() {
    return (
        <div className="grid h-screen lg:grid-cols-2 overflow-hidden">
            <div className="flex flex-col gap-4 p-4 md:p-8">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <LoginForm />
                    </div>
                </div>
            </div>

            <div className="relative hidden bg-muted lg:flex items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1736117024365-c36ccb9f843d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Description"
                    width={500} // Add a width property
                    height={300} // Optionally, add a height property
                />
            </div>
        </div>
    );
}
