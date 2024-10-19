import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex p-20 justify-between">
            {/* Left side: Login form (to be added) */}
            <div className="w-1/3">
                {/* Login form will go here */}
                <Button>
                    <Link href="/">Login</Link>
                </Button>
                {/* Placeholder for the login form */}
            </div>

            {/* Right side: Background image */}
            <div className="w-2/3 relative">
                <Image 
                    src="/authBackground.svg" 
                    alt="Auth Background" 
                    layout="fill"
                    priority
                    className="draggable-none pointer-events-none"
                />
            </div>
        </div>
    );
}
